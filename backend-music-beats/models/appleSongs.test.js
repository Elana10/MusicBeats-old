"use strict";

const AppleSongs = require("./AppleSongs");
const db = require("../db");

jest.mock("../db");

describe("AppleSongs", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addSong", () => {
    test("should insert a new song if it does not already exist", async () => {
      const song = {
        id: 123,
        bpm: 120,
        attributes: {
          name: "Song Name",
          artistName: "Artist Name",
        },
      };

      db.query.mockResolvedValue({ rows: [] });

      await AppleSongs.addSong(song);

      expect(db.query).toHaveBeenCalledTimes(2);
      expect(db.query).toHaveBeenCalledWith(expect.any(String), [123]);
      expect(db.query).toHaveBeenCalledWith(expect.any(String), [
        123,
        expect.any(String),
        120,
        "Song Name",
        "Artist Name",
      ]);
    });

    test("should not insert a new song if it already exists", async () => {
      const song = {
        id: 123,
        bpm: 120,
        attributes: {
          name: "Song Name",
          artistName: "Artist Name",
        },
      };

      db.query.mockResolvedValue({ rows: [{ appleID: 123 }] });

      await AppleSongs.addSong(song);

      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(expect.any(String), [123]);
    });
  });


});
