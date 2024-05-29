"use strict";

const request = require("supertest");
const express = require("express");
const playlistsRoutes = require("./playlistsRoutes");
const Playlists = require("../models/playlists");
const PlaylistsSongs = require("../models/playlists_songs");

jest.mock("../models/playlists", () => ({
  createPlaylist: jest.fn(),
  getAllPlaylists: jest.fn(),
  getUserPlaylists: jest.fn(),
  getOnePlaylist: jest.fn(),
  getAllSongsOnPlaylist: jest.fn(),
  removeASongFromPlaylist: jest.fn(),
  deleteUserPlaylist: jest.fn(),
}));

jest.mock("../models/playlists_songs", () => ({
  addSongPlaylist: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(playlistsRoutes);

describe("Playlist Routes", () => {
  test("GET / should return combined list of songs", async () => {
    // Mocked request query parameters
    const req = {
      query: { term: "test", tempo: "fast" },
      headers: { authorization: "mockedToken" },
    };
    // Mocked response
    const mockedResponse = [{ id: 1, name: "Song 1" }, { id: 2, name: "Song 2" }];
    Playlists.getAllPlaylists.mockResolvedValue(mockedResponse);
    Playlists.getUserPlaylists.mockResolvedValue(mockedResponse);
    Playlists.getAllSongsOnPlaylist.mockResolvedValue(mockedResponse);

    const response = await request(app).get("/").query(req.query).set(req.headers);
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toEqual(mockedResponse);
  });

  test("POST /create should create a new playlist", async () => {
    const reqBody = { name: "New Playlist", userId: 1 };
    const mockResult = { id: 1, name: "New Playlist" };
    Playlists.createPlaylist.mockResolvedValue(mockResult);

    const response = await request(app).post("/create").send(reqBody);
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toEqual(mockResult);
  });

});
