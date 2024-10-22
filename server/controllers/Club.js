const prisma = require("../config/database.js");
const { uploadImageToCloudinary } = require("../utils/imageUpload");
const { generateMembershipCard } = require("../utils/generateCards.js");
const { v4: uuidv4 } = require("uuid");

exports.createClub = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      secretary,
      president,
      vicePresident,
      email,
      phone,
    } = req.body;

    const logo = req.files.logo;

    const testimonials = Object.keys(req.body)
      .filter((key) => key.startsWith("testimonials["))
      .reduce((acc, key) => {
        const indexMatch = key.match(/\[(\d+)\]/);
        if (indexMatch) {
          const index = indexMatch[1];

          if (!acc[index]) {
            acc[index] = { content: "", author: "" };
          }

          if (key.includes("content")) {
            acc[index].content = req.body[key];
          } else if (key.includes("author")) {
            acc[index].author = req.body[key];
          }
        }
        return acc;
      }, []);

    const filteredTestimonials = testimonials.filter(
      (testimonial) => testimonial.content && testimonial.author
    );

    const galleryImages = Object.keys(req.files)
      .filter((key) => key.startsWith("galleryImages["))
      .map((key) => req.files[key]);

    const logoUrl = await uploadImageToCloudinary(logo, "clubs/logos");

    console.log("Images are Uploading");

    const galleryImageUrls = await Promise.all(
      galleryImages.map(async (image) => {
        const url = await uploadImageToCloudinary(image, "clubs/gallery");
        return url;
      })
    );

    const newClub = await prisma.club.create({
      data: {
        name,
        description,
        category,
        logoUrl,
        secretary,
        president,
        vicePresident,
        email,
        phone,
        testimonials: {
          create: filteredTestimonials.map((testimonial) => ({
            content: testimonial.content,
            author: testimonial.author,
          })),
        },
        gallery: {
          create: galleryImageUrls.map((url) => ({
            url,
          })),
        },
      },
    });

    res.status(201).json({ success: true, club: newClub });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not create club, please try again.",
    });
  }
};

exports.getClubById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: true,
      message: "Club id is missing",
    });
  }

  try {
    const club = await prisma.club.findUnique({
      where: { id },
      include: {
        testimonials: true,
        gallery: true,
        memberships: {
          select: {
            userId: true,
          },
        },
        events: {
          take: 3,
          orderBy: {
            timeDate: "asc",
          },
          select: {
            name: true,
            timeDate: true,
            image: true,
            studentsLimit: true,
            ticketPrice: true,
            _count: {
              select: {
                tickets: true,
              },
            },
          },
        },
      },
    });

    if (!club) {
      return res
        .status(404)
        .json({ success: false, message: "Club not found" });
    }

    res.status(200).json({ success: true, data: club });
  } catch (error) {
    console.error("Error fetching club:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await prisma.club.findMany({
      select: {
        id: true,
        name: true,
        logoUrl: true,
        category: true,
        president: true,
        _count: {
          select: {
            memberships: true,
          },
        },
      },
    });

    if (!clubs) {
      return res.status(400).json({
        success: false,
        message: "Club Failed to fetch",
      });
    }

    res.status(200).json({ success: true, clubs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.joinClub = async (req, res) => {
  try {
    const userId = req.user.id;
    const { clubId } = req.body;
    const user = req.user;

    if (!userId || !clubId) {
      return res.status(401).json({
        success: false,
        message: "User Or Club Not Found",
      });
    }

    const isMember = await prisma.clubMembership.findMany({
      where: {
        userId: userId,
        clubId: clubId,
      },
    });

    if (isMember.length > 0) {
      return res.status(401).json({
        success: false,
        message: "User already A Member",
      });
    }

    const club = await prisma.club.findUnique({
      where: {
        id: clubId,
      },
      select: {
        logoUrl: true,
        name: true,
      },
    });

    if (!club) {
      return res.status(404).json({ error: "Club not found." });
    }

    const memberId = `CLUB-${clubId.slice(-4)}-${userId.slice(
      -4
    )}-${uuidv4().slice(-4)}`;

    let membershipCardUrl;
    try {
      membershipCardUrl = await generateMembershipCard(user, memberId, club);
    } catch (error) {
      console.error("Error generating membership card:", error);
      return res
        .status(500)
        .json({ error: "Failed to generate membership card." });
    }

    const membership = await prisma.clubMembership.create({
      data: {
        userId,
        clubId,
        memberId,
        memberCardUrl: membershipCardUrl,
      },
    });

    res.status(200).json({ success: true, data: membership });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error in MemberCard Download",
    });
  }
};

exports.downloadMembershipCard = async (req, res) => {
  const { userId, clubId } = req.body;

  const membershipInfo = await prisma.clubMembership.findFirst({
    where: {
      userId: userId,
      clubId: clubId,
    },
    select: {
      memberCardUrl: true,
    },
  });

  console.log(membershipInfo);

  if (!membershipInfo) {
    return res.status(404).json({
      success: false,
      message: "Membership Not Found",
    });
  }

  return res.status(200).json({
    success: true,
    memberCardUrl: membershipInfo.memberCardUrl,
  });
};

exports.getJoinedClub = async (req, res) => {
  const userId = req.user.id;

  try {
    const joinedClubs = await prisma.clubMembership.findMany({
      where: {
        userId: userId,
      },
      select: {
        clubId: true,
        memberId: true,
        club: {
          select: {
            logoUrl: true,
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      joinedClubs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error in MemberCard Download",
    });
  }
};
