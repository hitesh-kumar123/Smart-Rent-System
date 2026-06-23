const request = require("supertest");
const app = require("../app"); // Import the exported app

describe("Health Check API", () => {
    it("GET /api/health should return 200", async () => {
        const res = await request(app).get("/api/health");
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("OK");
    });
});
