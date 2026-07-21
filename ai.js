const API_KEY = "AQ.Ab8RN6I6loHP1kerifJ5Xo6xCAiNyp8YymVS_z1B2d8AqYz5tg";

async function askGemini(question) {

  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Kai Student AI Assistant ne na ADUSTECH. Ka amsa tambayoyin ɗalibai cikin sauƙi da girmamawa.

Tambaya: ${question}`
            }]
          }]
        })
      }
    );

    const data = await response.json();

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Ban sami amsa ba.";

    addMessage(answer, "ai");

  } catch (err) {
    addMessage("An samu matsala wajen haɗuwa da AI.", "ai");
    console.error(err);
  }

}