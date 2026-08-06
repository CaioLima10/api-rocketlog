import { DeliveryLogsController } from "@/controllers/delivery-logs-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyAuthAuthorization } from "@/middlewares/verify-auth-authorization";

import { Router } from "express";

const deliveryLogsRoutes = Router()

const deliveryLogsController = new DeliveryLogsController()

deliveryLogsRoutes.post("/", 
  ensureAuthenticated,
  verifyAuthAuthorization(["sale"]),
  deliveryLogsController.create
)

deliveryLogsRoutes.get("/:delivery_id/show", 
  ensureAuthenticated, 
  verifyAuthAuthorization(["customer", "sale"]),
  deliveryLogsController.show
)


export { deliveryLogsRoutes }
