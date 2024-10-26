const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const cleanup = require("./services/cleanup");

const app = express();

const PORT = process.env.PORT || 4000;
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");

const userRoutes = require("./routes/User");
const clubRoutes = require("./routes/Club");
const eventRoutes = require("./routes/Event");
const adminRoutes = require("./routes/Admin");
const postsRoutes = require("./routes/Posts");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/club", clubRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/posts", postsRoutes);

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
