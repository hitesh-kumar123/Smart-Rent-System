const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const User = require("../models/user");

const ROUTE_PREFIX = "/api/users/register";
const LOGIN_URL = "/api/users/login";
const PROTECTED_URL = "/api/users/profile";
describe("🔐 Express Authentication: Detailed Registration Flow", () => {
  let mongoServer;

  // 1. Initialize safe in-memory MongoDB environment
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    await mongoose.connect(mongoUri);
  });

  // 2. Clear collection state between test runs
  afterEach(async () => {
    if (mongoose.connection.readyState === 1) {
      await User.deleteMany({});
    }
    jest.restoreAllMocks(); // Resets spy modifications
  });

  // 3. Complete database tear down
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // Strict valid payload satisfying your exact registerSchema validation limits
  const baseValidPayload = {
    username: "alexsmith",
    email: "alex@example.com",
    password: "securePassword123",
    firstName: "Alex",
    lastName: "Smith",
    phone: "9876543210",
    referralCode: "",
  };

  describe(`POST ${ROUTE_PREFIX}`, () => {
    // --- SCENARIO 1: SUCCESSFUL REGISTRATION ---
    it("should successfully register a user and return the complete user payload", async () => {
      // Mock model methods safely if they aren't fully configured in the test environment
      jest
        .spyOn(User.prototype, "generateAccessToken")
        .mockReturnValue("mocked-access-token");
      jest
        .spyOn(User.prototype, "generateRefreshToken")
        .mockReturnValue("mocked-refresh-token");

      const res = await request(app).post(ROUTE_PREFIX).send(baseValidPayload);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body.username).toBe(baseValidPayload.username);
      expect(res.body.email).toBe(baseValidPayload.email);
      expect(res.body.token).toBe("mocked-access-token"); // Maps to frontend 'token' mapping
      expect(res.headers["set-cookie"]).toBeDefined(); // Confirms setRefreshTokenCookie was invoked
    });

    // --- SCENARIO 2: DUPLICATE REGISTRATION PREVENTED ---
    it("should catch user collision and prevent duplicate email or username registrations", async () => {
      // Seed first user entry directly
      await request(app).post(ROUTE_PREFIX).send(baseValidPayload);

      // Attempt exactly identical secondary request
      const res = await request(app).post(ROUTE_PREFIX).send(baseValidPayload);

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("User already exists");
    });

    // --- SCENARIO 3: JOI SCHEMA INPUT VALIDATION FAILURES ---
    it("should reject requests that fail the Joi registerSchema limits", async () => {
      const invalidPayload = {
        ...baseValidPayload,
        username: "ab", // Invalid: shorter than minimum 3 chars limit
        password: "123", // Invalid: shorter than minimum 6 chars limit
      };

      const res = await request(app).post(ROUTE_PREFIX).send(invalidPayload);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
    });

    // --- SCENARIO 4: REFERRAL SYSTEM INTEGRATION ---
    it("should grant 100 extra referral points to a valid referring user", async () => {
      jest
        .spyOn(User.prototype, "generateAccessToken")
        .mockReturnValue("token");
      jest
        .spyOn(User.prototype, "generateRefreshToken")
        .mockReturnValue("token");

      // Create a valid referrer inside our test database first
      const referrerUser = await User.create({
        username: "topinviter",
        email: "referrer@example.com",
        password: "hashedPassword123",
        firstName: "Jane",
        lastName: "Doe",
        phone: "1112223333",
        referralCode: "INVITE100",
        referralPoints: 0,
      });

      const referredPayload = {
        ...baseValidPayload,
        username: "newfriend",
        email: "friend@example.com",
        referralCode: "INVITE100", // Target code match
      };

      const res = await request(app).post(ROUTE_PREFIX).send(referredPayload);

      expect(res.statusCode).toBe(201);

      // Confirm referral logic actually credited points in DB
      const updatedReferrer = await User.findById(referrerUser._id);
      expect(updatedReferrer.referralPoints).toBe(100);
    });

    // --- SCENARIO 5: COLD/UNAVAILABLE DATABASE FAILSAFE ---
    it("should safely return a 503 response if mongoose status drops offline", async () => {
      // 1. Save original property descriptor
      const originalDescriptor = Object.getOwnPropertyDescriptor(
        mongoose.Connection.prototype,
        "readyState",
      );

      // 2. Forcefully redefine readyState to return 0 (Disconnected)
      Object.defineProperty(mongoose.connection, "readyState", {
        get: () => 0,
        configurable: true,
      });

      const res = await request(app).post(ROUTE_PREFIX).send(baseValidPayload);

      // 3. Restore the original property mapping immediately so it doesn't break other tests
      if (originalDescriptor) {
        Object.defineProperty(
          mongoose.Connection.prototype,
          "readyState",
          originalDescriptor,
        );
      } else {
        delete mongoose.connection.readyState;
      }

      expect(res.statusCode).toBe(503);
      expect(res.body.message).toMatch(/Database is currently unavailable/i);
    });
  });

  // ==========================================
  // 2. LOGIN FLOWS (NEW)
  // ==========================================
  describe(`POST ${LOGIN_URL}`, () => {
    it("should successfully log in an existing user and return access token", async () => {
      jest
        .spyOn(User.prototype, "generateAccessToken")
        .mockReturnValue("successful-login-token");
      jest
        .spyOn(User.prototype, "generateRefreshToken")
        .mockReturnValue("successful-refresh-token");

      // Seed the database with a user first
      await request(app).post(ROUTE_PREFIX).send(baseValidPayload);

      // Attempt login
      const res = await request(app).post(LOGIN_URL).send({
        email: baseValidPayload.email,
        password: baseValidPayload.password,
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body.token).toBe("successful-login-token");
    });

    it("should reject login attempts with invalid credentials", async () => {
      await request(app).post(ROUTE_PREFIX).send(baseValidPayload);

      const res = await request(app).post(LOGIN_URL).send({
        email: baseValidPayload.email,
        password: "wrongPasswordHere", // Invalid password
      });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toMatch(/invalid|unauthorized|credentials/i);
    });
  });

  // ==========================================
  // 3. PROTECTED ENDPOINT FLOWS
  // ==========================================
  describe(`GET ${PROTECTED_URL}`, () => {
    it("should deny access to protected endpoints when no token is present", async () => {
      const res = await request(app).get(PROTECTED_URL); // No Authorization header provided

      expect(res.statusCode).toBe(401);
    });

    it("should deny access to protected endpoints when an invalid token is provided", async () => {
      const res = await request(app)
        .get(PROTECTED_URL)
        .set("Authorization", "Bearer blatantly_fake_token");

      expect(res.statusCode).toBe(401);
    });
  });
});
