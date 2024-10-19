const prisma = require("../config/database.js");

exports.deleteClub = async (req, res) => {
  const { clubId } = req.params;

  if (!clubId) {
    return res.status(400).json({
      success: false,
      message: "Club id is not found",
    });
  }

  try {
    const club = await prisma.club.findUnique({
      where: { id: clubId },
    });

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }

    try {
      await prisma.clubMembership.deleteMany({
        where: { clubId: clubId },
      });
    } catch (error) {
      console.error("Error deleting memberships:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete club memberships",
      });
    }

    try {
      await prisma.testimonial.deleteMany({
        where: { clubId: clubId },
      });
    } catch (error) {
      console.error("Error deleting testimonials:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete club testimonials",
      });
    }

    try {
      await prisma.galleryImage.deleteMany({
        where: { clubId: clubId },
      });
    } catch (error) {
      console.error("Error deleting gallery images:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete club gallery images",
      });
    }

    try {
      await prisma.event.deleteMany({
        where: { clubId: clubId },
      });
    } catch (error) {
      console.error("Error deleting club events:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete events associated with the club",
      });
    }

    await prisma.club.delete({
      where: {
        id: clubId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Club Deleted Successfully",
    });
  } catch (error) {
    console.error("Error deleting Club: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getClubDetails = async (req, res) => {
  const { clubId } = req.params;

  if (!clubId) {
    return res.status(404).json({
      success: false,
      message: "ClubId Missing",
    });
  }

  try {
    const clubDetails = await prisma.club.findFirst({
      where: {
        id: clubId,
      },
      include: {
        memberships: {
          select: {
            memberId: true,
            user: {
              select: {
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
      clubDetails,
    });
  } catch (error) {
    console.error("Error deleting Club: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const currentDate = new Date();

    const upcomingEvents = await prisma.event.findMany({
      where: {
        timeDate: {
          gt: currentDate,
        },
      },
      orderBy: {
        timeDate: "asc",
      },
    });

    const completedEvents = await prisma.event.findMany({
      where: {
        timeDate: {
          lt: currentDate,
        },
      },
      orderBy: {
        timeDate: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      upcomingEvents,
      completedEvents,
    });
  } catch (error) {
    console.error("Error fetching events", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        name: true,
        collegeEnrollNo: true,
        profileImage: true,
        email: true,
      },
    });

    return res.status(200).json({
      success: true,
      allUsers,
    });
  } catch (error) {
    console.error("Error fetching events", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.getEventDetailsForAdmin = async (req, res) => {
  const { eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({
      success: false,
      message: "Event Id is missing",
    });
  }

  try {
    const eventDetails = await prisma.event.findFirst({
      where: { id: eventId },
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

exports.removeClubMember = async (req, res) => {
  const { memberId } = req.params;

  if (!memberId) {
    return res.status(400).json({
      success: false,
      message: "memberId is missing",
    });
  }

  try {
    await prisma.clubMembership.delete({
      where: {
        memberId: memberId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Member removed successfully",
    });
  } catch (error) {
    console.error("Remove Member Error", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message || "Unknown error occurred",
    });
  }
};
