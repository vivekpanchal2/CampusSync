const express = require("express");
const router = express.Router();

const {
  createClub,
  getClubById,
  getAllClubs,
  downloadMembershipCard,
  joinClub,
  getJoinedClub,
} = require("../controllers/Club");

const { auth } = require("../middlewares/auth");

router.post("/createClub", createClub);
router.get("/getAllClubs", getAllClubs);
router.post("/download/membership", auth, downloadMembershipCard);
router.post("/joinClub", auth, joinClub);
router.get("/getJoinedClubs", auth, getJoinedClub);
router.get("/:id", getClubById);

module.exports = router;
