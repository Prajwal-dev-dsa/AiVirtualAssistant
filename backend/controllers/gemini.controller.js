import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const createErrorResponse = (command, responseMessage) => {
  return {
    type: "general",
    userInput: command || "unknown",
    response: responseMessage,
  };
};

export const askAssistant = async (req, res) => {
  const { command, assistantName, userName } = req.body;
  try {
    const apiUrl = process.env.GEMINI_API_URL;
    if (!apiUrl) {
      console.error("GEMINI_API_URL is not defined in .env file");
      return res.status(500).json(
        createErrorResponse(command, "Server configuration error.")
      );
    }
    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}.
        You are not Google. You will now behave like a voice-enabled assistant.

        Your task is to understand the user's natural language input and respond **ONLY** with a
        valid JSON object. Do not add any other text, greetings, or explanations.

        The JSON object must look like this:
        {
            "type": "general" | "google_search" | "youtube_search" | "youtube_play" |
            "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" |
            "instagram_open" | "facebook_open" | "weather_show",
            "userInput": "<original user input>" {only remove your name from user input if
            exists} and agar kisi ne google ya youtube pe kuch search karne ko bola hai to
            userInput me only bo search baala text jaye,
            "response": "<a short spoken response to read out loud to the user>"
        }

        Instructions:
            - "type": determine the intent of the user.
            - "userInput": original sentence the user spoke.
            - "response": A short voice-friendly reply.

        ---
        **EXAMPLE RESPONSES:**

        User Input: "Hello Nova"
        Your JSON Output:
        {
            "type": "general",
            "userInput": "Hello Nova",
            "response": "Hello! How can I help you?"
        }

        User Input: "Nova, search for the weather"
        Your JSON Output:
        {
            "type": "weather-show",
            "userInput": "search for the weather",
            "response": "Sure, getting the weather now."
        }
        ---

        Type meanings:
        - "google_search": if user wants to search something on Google.
        - "youtube_search": if user wants to search something on YouTube.
            - "youtube_play": if user wants to directly play a video or song.
            - "calculator_open": if user wants to open a calculator.
            - "reddit_open": if user wants to open reddit.
            - "amazon_open": if user wants to open amazon.
            - "cricbuzz_open": if user wants to know anything about cricket.
            - "flipkart_open": if user wants to open flipkart.
            - "netflix_open": if user wants to open netflix.
            - "jiostar_open" : if user wants to open jiostar or hotstar.
            - "spotify_open": if user wants to open spotify.
            - "amazon_music_open": if user wants to open amazon music.
            - "amazon_prime_video_open": if user wants to open amazon prime video.
            - "stackoverflow_open": if user wants to open stack overflow.
            - "hackerearth_open": if user wants to open hackerearth.
            - "github_open": if user wants to open github.
            - "linkedin_open": if user wants to open linkedin.
            - "twitter_open": if user wants to open twitter.
            - "whatsapp_open": if user wants to open whatsapp.
            - "telegram_open": if user wants to open telegram.
            - "chatgpt_open": if user wants to open chatgpt.
            - "gmail_open": if user wants to open gmail.
            - "outlook_open": if user wants to open outlook.
            - "teams_open": if user wants to open teams.
            - "zoom_open": if user wants to open zoom.
            - "slack_open": if user wants to open slack.
            - "discord_open": if user wants to open discord.
            - "gemini_open": if user wants to open gemini.
            - "perplexity_open": if user wants to open perplexity.
            - "anthropic_open": if user wants to open anthropic.
            - "openai_open": if user wants to open openai.
            - "google_open": if user wants to open google.
            - "leetcode_open":if user wants to open leetcode.
            - "codeforces_open":if user wants to open codeforces.
            - "hackerrank_open":if user wants to open hackerrank.
            - "codechef_open":if user wants to open codechef.
            - "geeksforgeeks_open":if user wants to open geeksforgeeks.
            - "mongodb_open": if user wants to open mongodb.
            - "instagram_open": if user wants to open instagram.
            - "facebook_open": if user wants to open facebook.
            - "weather_show": if user wants to know weather
            - "get_time": if user asks for current time.
            - "get_date": if user asks for today's date.
            - "get_day": if user asks what day it is.
            - "get_month": if user asks for the current month.
            - "get_year": if user asks for the current year.
            - "general": if it's a factual or informational question, or a simple greeting, and if user asks for time, date, day, month, or weather or any question which is not related to above types and if you know the answer then keep that also under the "general" category and straighaway explain the answer rather than saying "let me find for you". Give the answer directly and should not be too long.

        Important:
            - Use "${userName}" agar koi puche tume kisne banaya
            - **Only respond with the JSON object, nothing else.**
            - Do not wrap the JSON in Markdown code fences like \`\`\`json or \`\`\`.
            - **Even for a simple greeting like "hello", you must respond with the full JSON object.**
            - Your entire response must be ONLY the JSON object and nothing else.

        now your userInput- ${command}`;

    const geminiRes = await axios.post(apiUrl, {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    if (geminiRes.data.promptFeedback) {
      console.error(
        "Gemini API blocked the prompt:",
        geminiRes.data.promptFeedback
      );
      return res.status(400).json(
        createErrorResponse(
          command,
          "Sorry, I can't respond to that due to safety restrictions."
        )
      );
    }

    if (!geminiRes.data.candidates || geminiRes.data.candidates.length === 0) {
      console.error("Gemini API returned no candidates.");
      return res.status(500).json(
        createErrorResponse(
          command,
          "Sorry, I received an empty response from the assistant."
        )
      );
    }

    const responseText = geminiRes.data.candidates[0].content.parts[0].text;

    const cleanJsonString = responseText
      .replace(/^```json\n/, "")
      .replace(/\n```$/, "")
      .trim();

    try {
      const jsonObject = JSON.parse(cleanJsonString);
      res.status(200).json(jsonObject);

    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", parseError);
      console.error("Raw response was:", responseText);
      res.status(500).json(
        createErrorResponse(
          command,
          "Sorry, I had trouble understanding the assistant's reply."
        )
      );
    }

  } catch (error) {
    console.log(`Error in Gemini Controller: ${error.message}`);

    if (error.response) {
      console.error("Gemini API Error Data:", error.response.data);
      const apiError = error.response.data?.error || {};
      const apiStatus = error.response.status;

      if (apiStatus === 503 || apiError.status === "UNAVAILABLE") {
        return res.status(503).json(
          createErrorResponse(
            command,
            "The assistant is currently overloaded. Please try again in a moment."
          )
        );
      }

      return res.status(apiStatus).json(
        createErrorResponse(
          command,
          "Sorry, I'm having trouble connecting to the assistant right now."
        )
      );
    }

    res.status(500).json(
      createErrorResponse(
        command,
        "A server error occurred. Please check the backend logs."
      )
    );
  }
};