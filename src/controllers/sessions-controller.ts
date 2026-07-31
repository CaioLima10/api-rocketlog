import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/app-error"
import { compare } from "bcrypt"
import { Request, Response } from "express"
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

    return response.json({ message: "ok" }) 
  }

}

export { SessionsController }