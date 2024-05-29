"use strict";

const PlaylistsSongs = require("./PlaylistsSongs");
const db = require("../db");

jest.mock("../db");

describe("PlaylistsSongs", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addSongPlaylist", () => {
    test("should add a new song to a playlist if it does not already exist", async () => {
      const playlistid = 1;
      const songid = 123;

      db.query.mockResolvedValue({ rows: [] });

      const result = await PlaylistsSongs.addSongPlaylist({ playlistid, songid });

      expect(db.query).toHaveBeenCalledTimes(2);
      expect(db.query).toHaveBeenCalledWith(expect.any(String), [playlistid, songid]);
      expect(db.query).toHaveBeenCalledWith(expect.any(String), [playlistid, songid]);
      expect(result).toEqual({ id: expect.any(Number), playlistid, songid });
    });

    test("should not add a new song to a playlist if it already exists", async () => {
      const playlistid = 1;
      const songid = 123;

      db.query.mockResolvedValue({ rows: [{ id: 1 }] });

      const result = await PlaylistsSongs.addSongPlaylist({ playlistid, songid });

      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(expect.any(String), [playlistid, songid]);
      expect(result).toBeUndefined();
    });
  });

  describe("deletePlaylistSong", () => {
    test("should delete a song from a playlist", async () => {
      const playlistid = 1;
      const songid = 123;

      db.query.mockResolvedValue({ rows: [{ id: 1, playlistid, songid }] });

      const result = await PlaylistsSongs.deletePlaylistSong({ playlistid, songid });

      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(expect.any(String), [playlistid, songid]);
      expect(result).toEqual({ id: 1, playlistid, songid });
    });
  });


});
