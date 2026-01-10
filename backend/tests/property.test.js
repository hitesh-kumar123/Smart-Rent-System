const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

describe("Property API", () => {
    // Close the connection after tests to prevent handle reuse errors
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("GET /api/properties should return 200 and properties array", async () => {
        const res = await request(app).get("/api/properties");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.properties)).toBe(true);
    });
});
