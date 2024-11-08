import express from "express";
import { protect } from "../middleware/authMiddleware";

const ReservationRouter = express.Router();

import {
  createReservation,
  changeReservation,
} from "../controllers/reservationController";

ReservationRouter.post("/create", createReservation);
ReservationRouter.post("/change", changeReservation);

export default ReservationRouter;
