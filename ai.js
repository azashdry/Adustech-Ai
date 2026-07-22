const API_KEY = "AQ.Ab8RN6I6loHP1kerifJ5Xo6xCAiNyp8YymVS_z1B2d8AqYz5tg";

const chatBox = document.getElementById("chat-box");
const input = document.getElementById("question");

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = sender;
    div.innerHTML = `<span>${text}</span>`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendQuestion() {

    const question = input.value.trim();

    if (!question) return;

    addMessage(question, "user");

    input.value = "";

    const loading = document.createElement("div");
    loading.className = "ai";
    loading.id = "loading";
    loading.innerHTML = "<span>Thinking...</span>";
    chatBox.appendChild(loading);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `You are Student AI Assistant for ADUSTECH. Answer students politely and simply.

Question:
${question}`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        document.getElementById("loading").remove();

        let answer = "Sorry, I couldn't answer.";

        if (
            data.candidates &&
            data.candidates.length > 0 &&
            data.candidates[0].content &&
            data.candidates[0].content.parts &&
            data.candidates[0].content.parts.length > 0
        ) {
            answer = data.candidates[0].content.parts[0].text;
        }

        addMessage(answer, "ai");

    } catch (error) {

        if (document.getElementById("loading")) {
            document.getElementById("loading").remove();
        }

        addMessage("Connection Error! Please check your internet or API Key.", "ai");

        console.log(error);

    }

}

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendQuestion();
    }
});