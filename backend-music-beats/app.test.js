"use strict";

const request = require("supertest");
const app = require("./app");

describe("Test endpoints", () => {
  test("GET /generate-token should return status 200", async () => {
    const response = await request(app).get("/generate-token");
    expect(response.statusCode).toBe(200);
  });


});
