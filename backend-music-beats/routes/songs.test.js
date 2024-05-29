"use strict";

const request = require("supertest");
const express = require("express");
const appleSongsRoutes = require("./appleSongsRoutes");
const AppleSongs = require("../models/appleSongs");

jest.mock("../models/appleSongs", () => ({
  getAllSongs: jest.fn(),
  getAllSongsReverse: jest.fn(),
  getAllSongsArtist: jest.fn(),
  getAllSongsArtistReverse: jest.fn(),
  getAllSongsBPM: jest.fn(),
  getAllSongsBPMReverse: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(appleSongsRoutes);

describe("Apple Songs Routes", () => {
  test("GET /all should return all songs", async () => {
    const req = { query: { offset: 0 } };
    const mockedResponse = [{ id: 1, name: "Song 1" }, { id: 2, name: "Song 2" }];
    AppleSongs.getAllSongs.mockResolvedValue(mockedResponse);

    const response = await request(app).get("/all").query(req.query);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockedResponse);
  });


});
