"use strict";

const {
  getSongsDirectSearch,
  getSongsPlaylistSearch,
  combineAndRemoveDuplicates,
} = require("./searchFunctions");
const AppleApi = require("../apis/appleapi");
const ChatApi = require("../apis/chatapi");
const AppleSongs = require("../models/appleSongs");

jest.mock("../apis/appleapi");
jest.mock("../apis/chatapi");
jest.mock("../models/appleSongs");

describe("searchFunctions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getSongsDirectSearch", () => {
    test("should return songs from direct search with specified term and tempo", async () => {
      const term = "test";
      const tempo = "slow";
      const MUT = "mockedToken";

      const response = {
        results: {
          songs: {
            data: [
              {
                attributes: {
                  name: "Song 1",
                  artistName: "Artist 1",
                },
              },
              {
                attributes: {
                  name: "Song 2",
                  artistName: "Artist 2",
                },
              },
            ],
            next: null,
          },
        },
      };

      AppleApi.findSongsWithWords.mockResolvedValue(response);
      ChatApi.getBeats.mockResolvedValue([80, 100]);

      const result = await getSongsDirectSearch(term, tempo, MUT);

      expect(AppleApi.findSongsWithWords).toHaveBeenCalledWith(`${term}`, MUT, 26);
      expect(ChatApi.getBeats).toHaveBeenCalledWith([
        ["Song 1", "Artist 1"],
        ["Song 2", "Artist 2"],
      ]);
      expect(AppleSongs.addSong).toHaveBeenCalledTimes(2);
      expect(result).toEqual(response.results.songs.data);
    });
  });

  describe("getSongsPlaylistSearch", () => {
    test("should return songs from playlist search with specified term and tempo", async () => {
      const term = "test";
      const tempo = "fast";
      const MUT = "mockedToken";

      const responsePlaylist = {
        results: {
          playlists: {
            data: [{ id: "playlistId" }],
          },
        },
      };

      const responseSongs = {
        data: [
          {
            attributes: {
              name: "Song 1",
              artistName: "Artist 1",
            },
          },
          {
            attributes: {
              name: "Song 2",
              artistName: "Artist 2",
            },
          },
        ],
      };

      AppleApi.findPlaylist.mockResolvedValue(responsePlaylist);
      AppleApi.fetchAllSongsInPlaylist.mockResolvedValue(responseSongs);
      ChatApi.getBeats.mockResolvedValue([120, 140]);

      const result = await getSongsPlaylistSearch(term, tempo, MUT);

      expect(AppleApi.findPlaylist).toHaveBeenCalledWith(term);
      expect(AppleApi.fetchAllSongsInPlaylist).toHaveBeenCalledWith(
        responsePlaylist.results.playlists.data[0].id,
        MUT
      );
      expect(ChatApi.getBeats).toHaveBeenCalledWith([
        ["Song 1", "Artist 1"],
        ["Song 2", "Artist 2"],
      ]);
      expect(AppleSongs.addSong).toHaveBeenCalledTimes(2);
      expect(result).toEqual(responseSongs.data);
    });
  });

  describe("combineAndRemoveDuplicates", () => {
    test("should combine arrays and remove duplicates", () => {
      const arr1 = [1, 2, 3];
      const arr2 = [3, 4, 5];

      const result = combineAndRemoveDuplicates(arr1, arr2);

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });
  });
});
