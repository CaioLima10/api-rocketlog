import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/app-error";
import { verify } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";


interface TokenPayload {
  role: string
  sub: string
}

function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  try {
    const headers = request.headers.authorization

    if(!headers) {
      throw new AppError("token jwt not found!", 401)
    }

    const [ , token ] = headers.split(" ")

    const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as TokenPayload

    request.user = {
      role,
      id: user_id
    }

    next()

  } catch (error) {
    throw new AppError("token jwt not found!", 401)
  }
}

export { ensureAuthenticated }