import { authConfig } from "@/configs/auth"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/app-error"
import { compare } from "bcrypt"
import { Request, Response } from "express"
import {sign} from "jsonwebtoken"
import z from "zod"

class SessionsController {
  async create(request: Request, response: Response){
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    })

    const { email, password } = bodySchema.parse(request.body)

    const user = await prisma.user.findUnique({ 
      where: { email }
    }) 

    if(!user) {
      throw new AppError("Invalid email or password!")
    }
    
    const passwordCompare = await compare(password, user.password)
    
    if(!passwordCompare) {
      throw new AppError("Invalid email or password!")
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = await sign({ role: user.role ?? "customer" }, secret, {
      subject: user.id,
      expiresIn
    })

    const { password: hashedPassword, ...userWithoutPassword } = user

    return response.json({ user: userWithoutPassword, token }) 
  }

}

export { SessionsController }