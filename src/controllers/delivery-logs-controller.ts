import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/app-error";
import { Request, Response, NextFunction } from "express";
import z from "zod";

class DeliveryLogsController {
  async create(request: Request, response: Response, next: NextFunction) {

    const bodySchema = z.object({
      delivery_id: z.string().uuid(),
      description: z.string()
    })

    const { delivery_id, description } = bodySchema.parse(request.body)

    const delivery = await prisma.delivery.findUnique({
      where:{
        id: delivery_id
      }
    })

    if(!delivery) {
      throw new AppError("Delivery not found!", 404)
    }
    
    if(delivery.status === "processing" ){
      throw new AppError("Change status to shipped!")
    }

    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description
      }
    })

    return response.status(200).json()
  }  

  async show(request: Request, response: Response, next: NextFunction) {

    const paramsSchema = z.object({
      delivery_id: z.string().uuid()
    })

    const { delivery_id } = paramsSchema.parse(request.params)


    const deliveryLog = await prisma.delivery.findUnique({
      where:{
        id: delivery_id
      },
      include: {
        deliveryLogs: true,
        user: true,
      }
    })

    if(request.user?.role === "customer" && request.user.role !== deliveryLog?.userId){
      throw new AppError("The user can only view their deliveries", 401)
    }

    if(deliveryLog?.status === "delivered") {
      throw new AppError("this order has already been delivered")
    }

    return response.status(200).json({ deliveryLog })
  }
}


export { DeliveryLogsController }