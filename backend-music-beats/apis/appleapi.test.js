"use strict";

const axios = require("axios");
const AppleApi = require("./AppleApi");
const getToken = require("../helper/token");

jest.mock("axios");
jest.mock("../helper/token");

describe("AppleApi", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findPlaylist", () => {
    test("should fetch playlist based on search term", async () => {
      const term = "test";
      const token = "mockedToken";
      const response = { data: "mockedData" };

      getToken.mockResolvedValue(token);
      axios.get.mockResolvedValue(response);

      const result = await AppleApi.findPlaylist(term);

      expect(getToken).toHaveBeenCalled();
      expect(axios.get).toHaveBeenCalledWith(
        `https://api.music.apple.com/v1/catalog/us/search?term=${term}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      expect(result).toEqual(response.data);
    });
  });

  describe("fetchAllSongsInPlaylist", () => {
    test("should fetch all songs in a playlist", async () => {
      const playlistID = "playlistId";
      const MUT = "mockedMUT";
      const token = "mockedToken";
      const response = { data: "mockedData" };

      getToken.mockResolvedValue(token);
      axios.get.mockResolvedValue(response);

      const result = await AppleApi.fetchAllSongsInPlaylist(playlistID, MUT);

      expect(getToken).toHaveBeenCalled();
      expect(axios.get).toHaveBeenCalledWith(
        `https://api.music.apple.com/v1/catalog/us/playlists/${playlistID}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Music-User-Token": MUT,
          },
        }
      );
      expect(result).toEqual(response.data);
    });
  });

  describe("findSongsWithWords", () => {
    test("should fetch songs based on search term and offset", async () => {
      const term = "test";
      const MUT = "mockedMUT";
      const offset = 26;
      const token = "mockedToken";
      const response = { data: "mockedData" };

      getToken.mockResolvedValue(token);
      axios.get.mockResolvedValue(response);

      const result = await AppleApi.findSongsWithWords(term, MUT, offset);

      expect(getToken).toHaveBeenCalled();
      expect(axios.get).toHaveBeenCalledWith(
        `https://api.music.apple.com/v1/catalog/us/search?types=songs&term=${term}&with=topResults&limit=25&offset=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Music-User-Token": MUT,
          },
        }
      );
      expect(result).toEqual(response.data);
    });
  });
});
