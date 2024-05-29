"use strict";

const Playlists = require("./Playlists");
const db = require("../db");

jest.mock("../db");

describe("Playlists", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createPlaylist", () => {
    test("should create a new playlist", async () => {
      const playlistData = {
        id: 1,
        name: "Test Playlist",
        description: "Test description",
        tempo: "fast",
      };

      db.query.mockResolvedValue({
        rows: [{ id: 1, tempo: "fast", name: "Test Playlist", description: "Test description" }],
      });

      const result = await Playlists.createPlaylist(playlistData);

      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(expect.any(String), [
        playlistData.id,
        playlistData.name,
        playlistData.description,
        playlistData.tempo,
      ]);
      expect(result).toEqual({ id: 1, tempo: "fast", name: "Test Playlist", description: "Test description" });
    });
  });

  describe("getUserPlaylists", () => {
    test("should get user playlists", async () => {
      const userId = 1;

      db.query.mockResolvedValue({ rows: [{ id: 1, name: "Playlist 1" }, { id: 2, name: "Playlist 2" }] });

      const result = await Playlists.getUserPlaylists(userId);

      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(expect.any(String), [userId]);
      expect(result).toEqual([{ id: 1, name: "Playlist 1" }, { id: 2, name: "Playlist 2" }]);
    });
  });


});
