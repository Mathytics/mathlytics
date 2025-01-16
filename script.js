const topics = {
    form2: [
        { name: "Three Dimensional Shapes", urlNotes: "https://example.com/form2/3d-notes", urlExercises: "https://example.com/form2/3d-exercises", urlQuizes: "https://example.com/form2/quizzes", urlPastYear: "https://example.com/form2/past-year" },
        { name: "Cartesian Plane", urlNotes: "https://example.com/form2/cartesian-notes", urlExercises: "https://example.com/form2/cartesian-exercises", urlQuizes: "https://example.com/form2/quizzes", urlPastYear: "https://example.com/form2/past-year" }
    ],
    form4: [
        { 
            name: "Operation on Sets", 
            urlNotes: "https://drive.google.com/file/d/1NqdfACzqxtk0JufWLmfHZ50DWAYS6bTN/view", 
            urlExercises: "https://example.com/form4/sets-exercises", 
            urlQuizes: "https://example.com/form4/quizzes", 
            urlPastYear: "https://example.com/form4/past-year",
            subtopics: [
                { 
                    name: "4.1: Three Dimensional Shapes", 
                    urlNotes: "https://example.com/form2/3d-notes", 
                    urlExercises: "https://example.com/form2/3d-exercises", 
                    urlQuizes: "https://example.com/form2/quizzes", 
                    urlPastYear: "https://example.com/form2/past-year" 
                },
                { 
                    name: "4.2: Cartesian Plane", 
                    urlNotes: "https://example.com/form2/cartesian-notes", 
                    urlExercises: "https://example.com/form2/cartesian-exercises", 
                    urlQuizes: "https://example.com/form2/quizzes", 
                    urlPastYear: "https://example.com/form2/past-year" 
                }
            ]
        },
        { 
            name: "Logical Reasoning", 
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

    if (form && topics[form]) {
        topics[form].forEach(topic => {
            const option = document.createElement("option");
            option.value = topic.name;
            option.textContent = topic.name;
            topicSelect.appendChild(option);

            // Add subtopics if they exist
            if (topic.subtopics) {
                topic.subtopics.forEach(subtopic => {
                    const subOption = document.createElement("option");
                    subOption.value = subtopic.name;
                    subOption.textContent = `-- ${subtopic.name}`;
                    topicSelect.appendChild(subOption);
                });
            }
        });
    }
}

function showLinks() {
    const form = document.getElementById("form").value;
    const topicName = document.getElementById("topic").value;
    const linksDiv = document.getElementById("links");

    linksDiv.innerHTML = ""; // Clear previous links

    if (form && topicName) {
        let selectedTopic = topics[form].find(topic => topic.name === topicName);
        if (!selectedTopic) {
            // Search subtopics
            selectedTopic = topics[form].flatMap(topic => topic.subtopics || []).find(subtopic => subtopic.name === topicName);
        }

        if (selectedTopic) {
            linksDiv.innerHTML = `
                <a href="${selectedTopic.urlNotes}" target="_blank">View Notes</a>
                <a href="${selectedTopic.urlExercises}" target="_blank">View Exercises</a>
                <a href="${selectedTopic.urlQuizes}" target="_blank">View Quizzes</a>
                <a href="${selectedTopic.urlPastYear}" target="_blank">View Past Year</a>
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
