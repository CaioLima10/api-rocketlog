import { Request, Response, NextFunction } from "express"

class DeliveriesController {
  create(request: Request, response: Response, next: NextFunction){
    return response.json({ message: "okk" })
  }
}

export { DeliveriesController }