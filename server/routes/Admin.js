const express = require("express");
const router = express.Router();

const {
  deleteClub,
  getClubDetails,
  getAllEvents,
  getAllUsers,
  getEventDetailsForAdmin,
  removeClubMember,
} = require("../controllers/Admin");

const { auth, isAdmin } = require("../middlewares/auth");

router.delete("/deleteClub/:clubId", auth, isAdmin, deleteClub);
router.get("/getClubDetails/:clubId", auth, isAdmin, getClubDetails);
router.get("/getAllEvents", auth, isAdmin, getAllEvents);
router.get("/getAllUsers", auth, isAdmin, getAllUsers);
router.get(
  "/getEventDetailsForAdmin/:eventId",
  auth,
  isAdmin,
  getEventDetailsForAdmin
);

router.delete("/removeClubMember/:memberId", auth, isAdmin, removeClubMember);

module.exports = router;
