const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

describe("Property API", () => {
    // Close the connection after tests to prevent handle reuse errors
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("GET /api/properties/test should return 200 and an array", async () => {
        const res = await request(app).get("/api/properties/test");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
