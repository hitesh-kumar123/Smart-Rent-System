//A route to handle the wishList of a user specifically
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { protect } = require("../middleware/authMiddleware");

router.post("/:propertyId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { propertyId } = req.params;

    const index = user.wishlist.indexOf(propertyId);

    if (index === -1) {
      user.wishlist.push(propertyId);
    } else {
      user.wishlist.splice(index, 1);
    }

    await user.save();
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: "Wishlist update failed" });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
});

module.exports = router;
