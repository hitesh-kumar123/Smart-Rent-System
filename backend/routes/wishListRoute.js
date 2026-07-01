// A route to handle the wishlist of a user specifically
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const validatePropertyId = (req, res, next) => {
  const { propertyId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({ message: "Invalid propertyId" });
  }
  next();
};

router.post("/:propertyId", protect, validatePropertyId, userController.toggleWishlist);
router.get("/", protect, userController.getWishlist);

module.exports = router;
