import { AppError } from "@/utils/app-error"
import { Request, Response, NextFunction } from "express"

function errorHandling(
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction
){
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message })
  }

  return response.status(500).json({ message: error.message })
}

export { errorHandling }
