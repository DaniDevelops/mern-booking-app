import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/type";

const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  const reqUserId = req.userId;
  try {
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: reqUserId } },
    });

    const results = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (booking) => booking.userId === reqUserId
      );

      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });
    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong: couldn't fetch bookings" });
  }
});

export default router;
