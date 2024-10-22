const prisma = require("../config/database.js");
const { uploadImageToCloudinary } = require("../utils/imageUpload");

const razorpayInstance = require("../config/razorpay");
const crypto = require("crypto");
const { generateTicketCard } = require("../utils/generateCards.js");

exports.getClubList = async (req, res) => {
  try {
    const clubs = await prisma.club.findMany({
      select: {
        id: true,
        name: true,
        memberships: {
          select: {
            userId: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: clubs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch clubs" });
  }
};

exports.createEvent = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);

    const user = req.user;

    const {
      name,
      description,
      clubId,
      timeDate,
      studentsLimit,
      ticketPrice,
      venue,
    } = req.body;

    const image = req.files.image;

    let clubIdValue;

    if (clubId === "noClub") {
      clubIdValue = null;
    } else {
      clubIdValue = clubId;
    }

    console.log({ clubIdValue });

    if (
      !name ||
      !description ||
      !timeDate ||
      !studentsLimit ||
      !ticketPrice ||
      !image ||
      !venue
    ) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const imageUrl = await uploadImageToCloudinary(image, "Events");

    const EventInfo = await prisma.event.create({
      data: {
        name,
        description,
        venue,
        clubId: clubIdValue,
        timeDate: new Date(timeDate).toISOString(),
        studentsLimit: parseInt(studentsLimit),
        ticketPrice: parseInt(ticketPrice),
        image: imageUrl,
        createdById: user.id,
      },
    });

    res.status(200).json({
      success: true,
      data: EventInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch clubs" });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        studentsLimit: true,
        ticketPrice: true,
        timeDate: true,
        createdBy: {
          select: {
            name: true,
          },
        },
        club: {
          select: {
            name: true,
          },
        },
        tickets: {
          select: {
            userId: true,
          },
        },
      },
    });

    res.status(200).json({ success: true, events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Events" });
  }
};

exports.getEventById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Event Id Is Missing",
    });
  }

  try {
    const event = await prisma.event.findFirst({
      where: {
        id,
      },
      include: {
        club: {
          select: {
            name: true,
          },
        },
        createdBy: {
          select: {
            name: true,
          },
        },
        tickets: {
          select: {
            userId: true,
          },
        },
      },
    });

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Events" });
  }
};

exports.createOrder = async (req, res) => {
  const { eventId, userId } = req.body;

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        _count: {
          select: {
            tickets: true,
          },
        },
      },
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    const ticketsSold = event._count.tickets;

    console.log(ticketsSold, event.studentsLimit);

    if (ticketsSold >= event.studentsLimit) {
      return res.status(400).json({
        success: false,
        message: "The Event is Full",
      });
    }

    const shortEventId = eventId.slice(0, 8);
    const shortUserId = userId.slice(0, 8);

    const options = {
      amount: event.ticketPrice * 100,
      currency: "INR",
      receipt: `order_${shortEventId}_${shortUserId}`,
      payment_capture: 1,
    };

    const order = await razorpayInstance.orders.create(options);

    return res.json({
      success: true,
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Order creation failed." });
  }
};

exports.varifyPayment = async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    eventId,
  } = req.body;

  const user = req.user;
  const userId = user.id;

  const eventData = await prisma.event.findFirst({
    where: {
      id: eventId,
    },
    select: {
      name: true,
      venue: true,
      ticketPrice: true,
      timeDate: true,
    },
  });

  if (!eventData) {
    return res.status(404).json({
      success: false,
      message: "Event Not Found",
    });
  }

  try {
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      const ticketId = `TICKET-${eventId.slice(-4)}-${userId.slice(-4)}`;
      const ticketUrl = await generateTicketCard(user, ticketId, eventData);

      const newTicket = await prisma.ticket.create({
        data: {
          userId: user.id,
          eventId,
          ticketUrl,
          ticketId,
        },
      });

      res.json({
        success: true,
        message: "Payment successful, ticket generated!",
        ticket: newTicket,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Payment verification failed." });
  }
};

exports.joinFreeEvent = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const { eventId } = req.body;

  console.log(user, eventId);

  try {
    const eventData = await prisma.event.findFirst({
      where: {
        id: eventId,
      },
      select: {
        name: true,
        venue: true,
        ticketPrice: true,
        timeDate: true,
        studentsLimit: true,
        _count: {
          select: {
            tickets: true,
          },
        },
      },
    });

    const ticketsSold = eventData._count.tickets;

    console.log(ticketsSold, eventData.studentsLimit);

    if (ticketsSold >= eventData.studentsLimit) {
      return res.status(400).json({
        success: false,
        message: "The Event is Full",
      });
    }

    console.log({ eventData });

    if (eventData.ticketPrice !== 0) {
      return res.status(400).json({
        success: false,
        message: "Event is not Free",
      });
    }

    const ticketId = `TICKET-${eventId.slice(-4)}-${userId.slice(-4)}`;

    const ticketUrl = await generateTicketCard(user, ticketId, eventData);

    console.log({ ticketUrl, eventId });

    const newTicket = await prisma.ticket.create({
      data: {
        userId: user.id,
        eventId,
        ticketUrl,
        ticketId,
      },
    });

    if (!newTicket) {
      return res.status(400).json({
        success: false,
        message: "Ticket Not Generated",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event Joined Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getTicketDetails = async (req, res) => {
  const { ticketId } = req.params;

  if (!ticketId) {
    return res.status(400).json({
      success: false,
      message: "TicketId is Missing",
    });
  }

  try {
    const ticket = await prisma.ticket.findFirst({
      where: {
        id: ticketId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        event: {
          select: {
            name: true,
            club: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json(ticket);
  } catch (Error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: Error,
    });
  }
};

exports.getUsersEnrolledEvents = async (req, res) => {
  const user = req.user;

  try {
    const enrollEvents = await prisma.ticket.findMany({
      where: {
        userId: user.id,
      },

      include: {
        event: {
          select: {
            name: true,
            timeDate: true,
            venue: true,
            image: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      enrollEvents,
    });
  } catch (Error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: Error,
    });
  }
};

exports.getMyHostedEvents = async (req, res) => {
  const user = req.user;
  try {
    const hostedEvents = await prisma.event.findMany({
      where: {
        createdById: user.id,
      },
      select: {
        id: true,
        name: true,
        timeDate: true,
        venue: true,
        image: true,
        club: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      hostedEvents,
    });
  } catch (Error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: Error,
    });
  }
};

exports.getMyHostedEventInfo = async (req, res) => {
  const user = req.user;

  const { eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({
      success: false,
      message: "Event Id is missing",
    });
  }

  console.log(eventId, user.id);
  try {
    const eventDetails = await prisma.event.findFirst({
      where: { id: eventId, createdById: user.id },
      include: {
        tickets: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                collegeEnrollNo: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      eventDetails,
    });
  } catch (Error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: Error,
    });
  }
};

exports.editEvent = async (req, res) => {
  const userId = req.user.id;
  const { eventId } = req.params;
  const isAdmin = req.user.role == "Admin";

  const upadatedData = req.body.formData;

  const { name, description, timeDate, venue, studentsLimit } = upadatedData;

  if (!name || !description || !timeDate || !venue || !studentsLimit) {
    return res.status(400).json({
      success: false,
      message: "All Fields are required",
    });
  }

  if (!eventId) {
    return res.status(400).json({
      success: false,
      message: "eventId not found",
    });
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  if (!isAdmin && event.createdById !== userId) {
    return res.status(403).json({
      success: false,
      message: "You don't have permission to edit this event",
    });
  }

  try {
    const updatedEvent = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        name: name,
        description: description,
        venue: venue,
        timeDate: new Date(timeDate),
        studentsLimit: studentsLimit,
      },
    });

    console.log(updatedEvent);

    return res.status(200).json({
      success: true,
      message: "Event Updated Successfully",
    });
  } catch (error) {
    console.log("Edit Event Error", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.deleteEvent = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const isAdmin = req.user.role == "Admin";

  const { eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({
      success: false,
      message: "Event id is not found",
    });
  }

  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    console.log(event);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event Not Found",
      });
    }

    if (!isAdmin && event.createdById !== userId) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to edit this event",
      });
    }

    try {
      await prisma.ticket.deleteMany({ where: { eventId: eventId } });
    } catch (error) {
      console.error("Error deleting tickets: ", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete event tickets",
      });
    }

    await prisma.event.delete({ where: { id: eventId } });

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting event: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
