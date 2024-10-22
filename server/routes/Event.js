const express = require("express");
const router = express.Router();

const {
  getClubList,
  createEvent,
  getAllEvents,
  getEventById,
  createOrder,
  varifyPayment,
  joinFreeEvent,
  getTicketDetails,
  getUsersEnrolledEvents,
  getMyHostedEvents,
  getMyHostedEventInfo,
  editEvent,
  deleteEvent,
} = require("../controllers/Event");
const { auth } = require("../middlewares/auth");

router.get("/getClubList", getClubList);
router.post("/createEvent", auth, createEvent);
router.get("/getAllEvents", getAllEvents);

router.post("/create-order", createOrder);
router.post("/verify-payment", auth, varifyPayment);
router.post("/joinFreeEvent", auth, joinFreeEvent);

router.get("/getTicket/:ticketId", getTicketDetails);
router.get("/getUsersEnrollEvents", auth, getUsersEnrolledEvents);
router.get("/getMyHostedEvents", auth, getMyHostedEvents);
router.get("/getMyHostedEvent/:eventId", auth, getMyHostedEventInfo);

router.put("/updateEvent/:eventId", auth, editEvent);

router.delete("/deleteEvent/:eventId", auth, deleteEvent);

router.get("/:id", getEventById);

module.exports = router;
