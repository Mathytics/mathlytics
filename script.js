const topics = {
    form4: [
        { 
            name: "Logical Reasoning", 
            subtopics: [
                { 
                    name: "3.1: Statements", 
                    urlNotes: "https://drive.google.com/file/d/1XN9v0JmYM5CTCup2ZH_MknkLENjeWrZh/view?usp=drive_link", 
                    urlExercises: "https://drive.google.com/file/d/1fH6DfVaYVW81luXEhGXeLAewIfz5ZVXY/view?usp=drive_link", 
                    urlQuizes: "https://quizizz.com/join?gc=26597520", 
                    urlPastYear: "https://drive.google.com/drive/folders/1U7QRjrQ3h-NyCJkrzAsbDJvg15AQWgem?usp=drive_link",
                    urlRPH: "https://docs.google.com/document/d/13GOjOCprZSO9REfblE2EweZbQp1CDb-B/edit?usp=drive_link&ouid=100255213395062774814&rtpof=true&sd=true",
                    urlInteractive:"https://venn-vision.vercel.app/"
                },
                { 
                    name: "3.2: Arguments", 
                    urlNotes: "https://drive.google.com/file/d/1TZwf4Cg0AYcJ6ZuT6GBE9QtKrkaOInb1/view?usp=drive_link", 
                    urlExercises: "https://drive.google.com/file/d/1igMXsahIq7amwOmNo8APHtu9lpZaYXzi/view?usp=drive_link", 
                    urlQuizes: "https://quizizz.com/join?gc=05945488", 
                    urlPastYear: "https://drive.google.com/drive/folders/1U7QRjrQ3h-NyCJkrzAsbDJvg15AQWgem?usp=drive_link",
                    urlRPH: "https://docs.google.com/document/d/13GOjOCprZSO9REfblE2EweZbQp1CDb-B/edit?usp=drive_link&ouid=100255213395062774814&rtpof=true&sd=true",
                    urlInteractive:"https://venn-vision.vercel.app/"
                }
            ]
        },
        { 
            name: "Operation on Sets", 
            urlNotes: "https://drive.google.com/drive/folders/1G3YTL-3abMbn", 
            urlExercises: "https://drive.google.com/file/d/1xO333B7WJRyVZD5o9HhI46HB4NcWp0kd/view", 
            urlQuizes: "https://quizizz.com/join?gc=33531104", 
            urlPastYear: "https://drive.google.com/drive/folders/1yp3FVYg_RXKXHmq6T3eWRGmAAEI-ie8o" 
        }
    ]
};

function updateTopics() {
    const form = document.getElementById("form").value;
    const topicSelect = document.getElementById("topic");
    topicSelect.innerHTML = "<option value=''>-- Select Topic --</option>";
    document.getElementById("subtopic").innerHTML = "<option value=''>-- Select Subtopic --</option>";

    if (form && topics[form]) {
        topics[form].forEach(topic => {
            const option = document.createElement("option");
            option.value = topic.name;
            option.textContent = topic.name;
            topicSelect.appendChild(option);
        });
    }
}

function updateSubtopics() {
    const form = document.getElementById("form").value;
    const topicName = document.getElementById("topic").value;
    const subtopicSelect = document.getElementById("subtopic");
    subtopicSelect.innerHTML = "<option value=''>-- Select Subtopic --</option>";

    if (form && topicName) {
        const selectedTopic = topics[form].find(topic => topic.name === topicName);
        if (selectedTopic && selectedTopic.subtopics) {
            selectedTopic.subtopics.forEach(subtopic => {
                const option = document.createElement("option");
                option.value = subtopic.name;
                option.textContent = subtopic.name;
                subtopicSelect.appendChild(option);
            });
        }
    }
}

function showLinks() {
    const form = document.getElementById("form").value;
    const topicName = document.getElementById("topic").value;
    const subtopicName = document.getElementById("subtopic").value;
    const linksDiv = document.getElementById("links");

    linksDiv.innerHTML = ""; // Clear previous links

    if (form && (topicName || subtopicName)) {
        let selectedTopic = topics[form].find(topic => topic.name === topicName);
        if (subtopicName) {
            selectedTopic = selectedTopic?.subtopics?.find(subtopic => subtopic.name === subtopicName);
        }

        if (selectedTopic) {
            linksDiv.innerHTML = `
                <a href="${selectedTopic.urlNotes}" target="_blank">View Notes</a>
                <a href="${selectedTopic.urlExercises}" target="_blank">View Exercises</a>
                <a href="${selectedTopic.urlQuizes}" target="_blank">View Quizzes</a>
                <a href="${selectedTopic.urlPastYear}" target="_blank">View Past Year</a>
                <a href="${selectedTopic.urlRPH}" target="_blank">E-RPH</a>
                <a href="${selectedTopic.urlInteractive}" target="_blank">Interactive Lesson</a>
            `;
        }
    } else {
        linksDiv.textContent = "Please select both Form and Topic.";
    }
}



// LocalStorage for forum messages
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const messageBox = document.getElementById("messageBox");
    messageBox.innerHTML = "";
    messages.forEach(msg => {
        const p = document.createElement("p");
        p.textContent = msg;
        messageBox.appendChild(p);
    });
}

function submitQuery() {
    const queryInput = document.getElementById("queryInput").value;
    if (queryInput.trim() !== "") {
        const messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.push(queryInput);
        localStorage.setItem("messages", JSON.stringify(messages));
        loadMessages();
        document.getElementById("queryInput").value = "";
    } else {
        alert("Please enter a query before submitting.");
    }
}

window.onload = loadMessages;

async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    const chatBody = document.getElementById("chatBody");

    if (userInput.trim() === "") return;

    // Display user message
    chatBody.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;
    document.getElementById("userInput").value = "";

    // Send user input to OpenAI API (ChatGPT 3.5)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"  // Replace with your API key
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userInput }],
            max_tokens: 150  // Adjust the number of tokens as needed
        })
    });

    if (response.ok) {
        const data = await response.json();
        const aiMessage = data.choices[0].message.content;

        // Display AI response
        chatBody.innerHTML += `<div><strong>AI:</strong> ${aiMessage}</div>`;
        chatBody.scrollTop = chatBody.scrollHeight;  // Auto-scroll to bottom
    } else {
        chatBody.innerHTML += `<div><strong>AI:</strong> Sorry, there was an error.</div>`;
    }
}
