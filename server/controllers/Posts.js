const prisma = require("../config/database.js");
const { uploadImageToCloudinary } = require("../utils/imageUpload");

exports.createPost = async (req, res) => {
  const userId = req.user.id;

  console.log(userId);
  console.log(req.body);
  console.log(req.files);

  try {
    const { content } = req.body;
    const image = req.files?.image;
    let imageUrl = null;

    if (image) {
      imageUrl = await uploadImageToCloudinary(image, "clubs/postImages");
    }

    const newPost = await prisma.posts.create({
      data: {
        user: { connect: { id: userId } },
        content,
        image: imageUrl,
      },
    });

    return res.status(201).json({
      success: true,
      post: newPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Could not create Post, please try again.",
    });
  }
};

exports.createComment = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;
  const { content } = req.body;

  try {
    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Comment content is required",
      });
    }

    const newComment = await prisma.postComments.create({
      data: {
        user: { connect: { id: userId } },
        post: { connect: { id: postId } },
        content,
      },
      select: {
        content: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      comment: newComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Could not create comment, please try again.",
    });
  }
};

exports.getPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const posts = await prisma.posts.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: {
        user: {
          select: {
            name: true,
          },
        },
        _count: {
          select: { comments: true },
        },
      },
    });

    const totalPosts = await prisma.posts.count();

    return res.status(200).json({
      success: true,
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching posts.",
    });
  }
};

exports.getComments = async (req, res) => {
  const { postId } = req.params;

  if (!postId) {
    return res.status(401).json({
      success: false,
      message: "Post id missing",
    });
  }

  try {
    const comments = await prisma.postComments.findMany({
      where: {
        postId: postId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching posts.",
    });
  }
};

exports.getMyPosts = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(500).json({
      success: true,
      message: "Internal Server Error",
    });
  }

  try {
    const myPosts = await prisma.posts.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        _count: {
          select: { comments: true },
        },
      },
    });

    return res.status(200).json({
      success: true,
      myPosts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching posts.",
    });
  }
};
