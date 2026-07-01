const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const reviewController = require("../controllers/reviewController");
const { authenticate, authorize, isPropertyHost } = require("../middleware");
const Property = require("../models/property");
const { upload } = require("../cloudConfig");

// Public routes
router.get("/", propertyController.getProperties);
router.get("/:id", propertyController.getPropertyById);
router.get("/:propertyId/reviews", reviewController.getPropertyReviews);

// Protected routes - Host/Admin only
router.post(
  "/",
  authenticate,
  authorize("host", "admin"),
  propertyController.createProperty
);
router.put(
  "/:id",
  authenticate,
  isPropertyHost(Property),
  propertyController.updateProperty
);
router.delete(
  "/:id",
  authenticate,
  isPropertyHost(Property),
  propertyController.deleteProperty
);

// Property images
router.post(
  "/:id/images",
  authenticate,
  isPropertyHost(Property),
  upload.array("images", 10),
  propertyController.uploadPropertyImages
);
router.delete(
  "/:id/images/:imageId",
  authenticate,
  isPropertyHost(Property),
  propertyController.deletePropertyImage
);

// Availability management
router.put(
  "/:id/availability",
  authenticate,
  isPropertyHost(Property),
  propertyController.updateAvailability
);

// User's properties
router.get("/user/me", authenticate, propertyController.getMyProperties);

// Reviews
router.post(
  "/:propertyId/reviews",
  authenticate,
  reviewController.createReview
);

// Admin only routes
router.put(
  "/:id/approve",
  authenticate,
  authorize("admin"),
  propertyController.approveProperty
);

module.exports = router;
