"use strict";

const User = require("./User");
const db = require("../db");
const bcrypt = require("bcrypt");

jest.mock("../db");
jest.mock("bcrypt");

describe("User", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    test("should register a new user", async () => {
      const userData = {
        username: "testuser",
        password: "password123",
        email: "test@example.com",
      };

      db.query.mockResolvedValue({
        rows: [{ username: "testuser", id: 1, email: "test@example.com" }],
      });

      bcrypt.hash.mockResolvedValue("hashedPassword");

      const result = await User.register(userData);

      expect(db.query).toHaveBeenCalledTimes(1);
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, expect.any(Number));
      expect(db.query).toHaveBeenCalledWith(expect.any(String), [userData.username, "hashedPassword", userData.email]);
      expect(result).toEqual({ username: "testuser", id: 1, email: "test@example.com" });
    });

    test("should throw error if username is taken", async () => {
      const userData = {
        username: "existinguser",
        password: "password123",
        email: "test@example.com",
      };

      db.query.mockResolvedValue({ rows: [{ username: "existinguser" }] });

      await expect(User.register(userData)).rejects.toThrow("Username taken.");
    });
  });

  describe("authenticate", () => {
    test("should authenticate user with valid credentials", async () => {
      const username = "testuser";
      const password = "password123";
      const hashedPassword = "hashedPassword";

      const userData = { username, password: hashedPassword, email: "test@example.com", id: 1 };

      db.query.mockResolvedValue({ rows: [userData] });
      bcrypt.compare.mockResolvedValue(true);

      const result = await User.authenticate(username, password);

      expect(db.query).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toEqual({ username, email: "test@example.com", id: 1 });
    });

    test("should throw error for invalid credentials", async () => {
      const username = "testuser";
      const password = "password123";
      const hashedPassword = "hashedPassword";

      const userData = { username, password: hashedPassword, email: "test@example.com", id: 1 };

      db.query.mockResolvedValue({ rows: [userData] });
      bcrypt.compare.mockResolvedValue(false);

      await expect(User.authenticate(username, password)).rejects.toThrow("Invalid username/password.");
    });

    test("should throw error if user does not exist", async () => {
      const username = "nonexistentuser";

      db.query.mockResolvedValue({ rows: [] });

      await expect(User.authenticate(username, "password123")).rejects.toThrow("Invalid username/password.");
    });
  });
});
