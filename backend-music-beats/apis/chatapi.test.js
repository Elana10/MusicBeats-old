"use strict";

const OpenAIApi = require("openai");
const ChatApi = require("./ChatApi");
const { CHAT_KEY } = require("../secret");

jest.mock("openai");

describe("ChatApi", () => {
  describe("getBeats", () => {
    test("should return beats per minute for track and artist", async () => {
      const trackAndArtist = [
        ["Staying Alive", "Bee Gees"],
        ["I Remember Everything (feat. Kacey Musgraves)", "Zach Bryan"],
      ];

      const expectedCompletion = {
        choices: [
          {
            message: {
              content: '{"0":103,"1":78}',
            },
          },
        ],
      };

      const createMock = jest.fn().mockResolvedValue(expectedCompletion);

      OpenAIApi.prototype.chat = {
        completions: {
          create: createMock,
        },
      };

      const result = await ChatApi.getBeats(trackAndArtist);

      expect(createMock).toHaveBeenCalledWith({
        messages: [
          {
            role: "system",
            content:
              "Please return only a json object with keys that match the provided array index and object values that are the beats per minute of the [song, composer] found in that index of the array. For example, the array [['Staying Alive','Bee Gees'],['I Remember Everything (feat. Kacey Musgraves)','Zach Bryan']] should return {0 : 103, 1:78}",
          },
          {
            role: "user",
            content: `${trackAndArtist}`,
          },
        ],
        model: "gpt-3.5-turbo-0125",
        response_format: { type: "json_object" },
      });

      expect(result).toEqual({ "0": 103, "1": 78 });
    });

    test("should throw an error if unable to get JSON from chatGPT", async () => {
      const trackAndArtist = [
        ["Staying Alive", "Bee Gees"],
        ["I Remember Everything (feat. Kacey Musgraves)", "Zach Bryan"],
      ];

      const createMock = jest.fn().mockRejectedValue(new Error("Error"));

      OpenAIApi.prototype.chat = {
        completions: {
          create: createMock,
        },
      };

      await expect(ChatApi.getBeats(trackAndArtist)).rejects.toThrow(
        "Failed to get JSON from chatGPT."
      );

      expect(createMock).toHaveBeenCalledTimes(4); // Four attempts
    });
  });
});
