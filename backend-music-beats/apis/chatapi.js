"use strict";
const  OpenAIApi = require("openai");
// const {CHAT_KEY} = require('../secret')


// Initialize the OpenAIApi client with the configuration
const openai = new OpenAIApi({
    apiKey : CHAT_KEY,
  });


class ChatApi {
    static async getBeats(trackAndArtist){
        const attempts = 4;
        for(let i = 0; i < 4; i++){
            try{
                const completion = await openai.chat.completions.create(
                    {
                        messages:[{
                            role:"system",
                            content: "Please return only a json object with keys that match the provided array index and object values that are the beats per minute of the [song, composer] found in that index of the array. For example, the array [['Staying Alive','Bee Gees'],['I Remember Everything (feat. Kacey Musgraves)','Zach Bryan']] should return {0 : 103, 1:78}"},
                            {role :"user",
                                content: `${trackAndArtist}`
                            }],
                        model : "gpt-3.5-turbo-0125",
                        response_format: { type: "json_object" }
                    }
                )

                return JSON.parse(completion.choices[0].message.content);
            } catch (e) {
                if(i > attempts){
                    throw new Error('Failed to get JSON from chatGPT.')                  
                }
            }
        }

    }
}

module.exports = ChatApi
