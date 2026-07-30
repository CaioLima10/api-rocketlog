import { Request, Response } from "express"

class UsersController {
  create(request: Request, response: Response) {
    response.status(200).json({ message: "ok!" })
  }
}

export { UsersController }