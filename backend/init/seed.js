const mongoose = require("mongoose");
const dotenv = require("dotenv");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const connectDB = require("./database");
const Property = require("../models/property");
const User = require("../models/user");

const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
const adminPassword = process.env.ADMIN_PASSWORD;
const adminUsername = process.env.ADMIN_USERNAME || "admin";
const adminFirstName = process.env.ADMIN_FIRST_NAME || "Admin";
const adminLastName = process.env.ADMIN_LAST_NAME || "User";

// Load env variables
dotenv.config();

const loadDummyProperties = () => {
  const dummyPath = path.join(__dirname, "../../frontend/src/data/dummyProperties.js");
  if (!fs.existsSync(dummyPath)) {
    throw new Error(`Dummy properties file not found at: ${dummyPath}`);
  }

  let content = fs.readFileSync(dummyPath, "utf8");

  // Strip ESM syntax
  content = content.replace(/export const/g, "const");
  content = content.replace(/export default/g, "module.exports =");

  const tempFile = path.join(__dirname, "temp_dummy_seed.js");
  fs.writeFileSync(tempFile, content + "\nmodule.exports = { dummyProperties };", "utf8");

  const { dummyProperties } = require(tempFile);

  // Cleanup temp file
  try {
    fs.unlinkSync(tempFile);
  } catch (err) {
    console.error("Error cleaning up temp seed file:", err.message);
  }

  return dummyProperties;
};

const seedDB = async () => {
  try {
    // 1. Connect to DB
    await connectDB();

    // 2. Clear existing properties
    console.log("Clearing existing properties...");
    await Property.deleteMany({});
    console.log("Properties cleared.");

    // 3. Find or Create default Owner (Admin)
    console.log("Checking for admin user...");
    let adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      console.log(`Admin user not found. Creating default admin user ${adminEmail}...`);
      const safePassword =
        adminPassword ||
        crypto.randomBytes(12).toString("base64").replace(/[+/=]/g, "A");

      adminUser = new User({
        username: adminUsername,
        email: adminEmail,
        password: safePassword,
        firstName: adminFirstName,
        lastName: adminLastName,
        role: "admin",
        isVerified: true,
      });
      await adminUser.save();
      console.log("Default admin user created successfully.");
      if (!adminPassword) {
        console.log(
          "WARNING: A random admin password was generated for local seeding.");
        console.log(`Admin email: ${adminEmail}`);
        console.log(`Admin password: ${safePassword}`);
        console.log("Set ADMIN_PASSWORD in .env for a stable credential.");
      }
    }

    const ownerId = adminUser._id;

    // 4. Load & Parse dummy properties
    console.log("Loading dummy properties...");
    const dummyProperties = loadDummyProperties();
    console.log(`Loaded ${dummyProperties.length} dummy properties.`);

    // 5. Enrich properties
    const enrichedProperties = dummyProperties.map((p, index) => {
      // Map category
      const validCategories = ["Apartment", "House", "Villa", "Condo", "Cabin", "Cottage", "Farmhouse", "Other"];
      let category = p.category;
      if (!validCategories.includes(category)) {
        category = "Other";
      }

      // City Coordinates Mapping
      const cityCoords = {
        "New York": [-73.935242, 40.730610],
        "Chicago": [-87.629798, 41.878114],
        "Miami": [-80.191790, 25.761680],
        "Portland": [-122.676483, 45.515232],
        "Los Angeles": [-118.243685, 34.052234],
        "San Francisco": [-122.419416, 37.774929],
        "Seattle": [-122.332071, 47.606209],
        "Austin": [-97.743061, 30.267153],
        "Boston": [-71.058880, 42.360082],
        "Denver": [-104.990251, 39.739236]
      };

      const city = p.location.city || "New York";
      const baseCoords = cityCoords[city] || [-73.935242, 40.730610];

      // Inject slight random noise to spread coordinates
      const noiseLong = (Math.random() - 0.5) * 0.02;
      const noiseLat = (Math.random() - 0.5) * 0.02;
      const coordinates = [baseCoords[0] + noiseLong, baseCoords[1] + noiseLat];

      // Formulate capacities
      const bedrooms = p.capacity.bedrooms || 1;
      const bathrooms = p.capacity.bathrooms || 1;
      const guests = bedrooms * 2;
      const beds = bedrooms;

      // Map images array
      const images = p.images.map(img => {
        const url = typeof img === "object" ? img.url : img;
        return {
          url,
          publicId: "external_image"
        };
      });

      return {
        title: p.title,
        description: p.description,
        category: category,
        price: p.price,
        location: {
          type: "Point",
          coordinates,
          address: p.location.address || "123 Smart St",
          city,
          state: p.location.state || city,
          country: p.location.country || "USA",
          zipCode: p.location.zipCode || "10001"
        },
        images,
        amenities: {
          wifi: p.amenities ? !!p.amenities.wifi : false,
          kitchen: p.amenities ? !!p.amenities.kitchen : false,
          ac: p.amenities ? !!p.amenities.ac : false,
          heating: p.amenities ? !!p.amenities.heating : false,
          tv: p.amenities ? !!p.amenities.tv : false,
          parking: p.amenities ? !!p.amenities.parking : false,
          pool: p.amenities ? !!p.amenities.pool : false,
          washer: p.amenities ? !!p.amenities.washer : false,
          dryer: p.amenities ? !!p.amenities.dryer : false,
          gym: p.amenities ? !!p.amenities.gym : false,
          hotTub: p.amenities ? !!p.amenities.hotTub : false,
          breakfast: p.amenities ? !!p.amenities.breakfast : false,
          workspace: p.amenities ? !!p.amenities.workspace : false,
          petFriendly: p.amenities ? !!p.amenities.petFriendly : false,
        },
        capacity: {
          guests,
          bedrooms,
          beds,
          bathrooms
        },
        rules: {
          smoking: false,
          pets: p.amenities ? !!p.amenities.petFriendly : false,
          parties: false,
          checkInTime: "14:00",
          checkOutTime: "11:00"
        },
        owner: ownerId,
        averageRating: p.rating || 0,
        numReviews: 0,
        isActive: true,
        isApproved: true
      };
    });

    // 6. Insert properties
    console.log(`Seeding ${enrichedProperties.length} properties...`);
    const seeded = await Property.insertMany(enrichedProperties);
    console.log(`Successfully seeded ${seeded.length} properties!`);

    // 7. Close DB connection and exit
    console.log("Database seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();
