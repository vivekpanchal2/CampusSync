const express = require("express");
const router = express.Router();

const { createClub, getClubById, getAllClubs } = require("../controllers/club");

router.post("/createClub", createClub);
router.get("/getAllClubs", getAllClubs);
router.get("/:id", getClubById);

module.exports = router;
