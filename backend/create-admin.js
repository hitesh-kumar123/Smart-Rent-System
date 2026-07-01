const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user");
const connectDB = require("./init/database.js");

// Load env variables
dotenv.config();

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const adminUsername = process.env.ADMIN_USERNAME || (adminEmail ? adminEmail.split("@")[0] : undefined);
const adminFirstName = process.env.ADMIN_FIRST_NAME || "Admin";
const adminLastName = process.env.ADMIN_LAST_NAME || "User";

if (!adminEmail || !adminPassword) {
  console.error(
    "ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment before running create-admin.js"
  );
  process.exit(1);
}

// Connect to MongoDB
connectDB();

// Create admin user
const createAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@example.com" });

    if (adminExists) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    // Create new admin user with environment-provided credentials
    const admin = new User({
      username: adminUsername,
      email: adminEmail,
      password: adminPassword,
      firstName: adminFirstName,
      lastName: adminLastName,
      role: "admin",
      isVerified: true,
    });

    await admin.save();
    console.log("Admin user created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

// Run the script
createAdmin();
