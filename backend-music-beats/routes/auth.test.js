"use strict";

const request = require("supertest");
const express = require("express");
const authRoutes = require("./authRoutes");
const User = require("../models/users");

jest.mock("../models/users", () => ({
  authenticate: jest.fn(),
  register: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(authRoutes);

describe("Authentication Routes", () => {
  test("POST /login should return status 200 and token", async () => {
    const mockUser = { username: "testuser", password: "password123" };
    const mockToken = "mockedToken";
    User.authenticate.mockResolvedValue(mockUser);
    
    const response = await request(app)
      .post("/login")
      .send({ username: "testuser", password: "password123" });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe(mockToken);
    expect(User.authenticate).toHaveBeenCalledWith(
      mockUser.username,
      mockUser.password
    );
  });

  test("POST /signup should return status 201 and token", async () => {
    const mockUser = { username: "testuser", password: "password123" };
    const mockToken = "mockedToken";
    User.register.mockResolvedValue(mockUser);
    
    const response = await request(app)
      .post("/signup")
      .send({ username: "testuser", password: "password123" });
    
    expect(response.statusCode).toBe(201);
    expect(response.body.token).toBe(mockToken);
    expect(User.register).toHaveBeenCalledWith(mockUser);
  });
});
