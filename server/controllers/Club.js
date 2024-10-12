const prisma = require("../config/database.js");
const { uploadImageToCloudinary } = require("../utils/imageUpload");

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

  console.log(id);

  try {
    const club = await prisma.club.findUnique({
      where: { id },
      include: {
        testimonials: true,
        gallery: true,
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
            members: true,
          },
        },
      },
    });

    res.json(clubs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch clubs" });
  }
};
