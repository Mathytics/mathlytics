const topics = {
    form2: [
        { name: "Three Dimensional Shapes", urlNotes: "https://example.com/form2/3d-notes", urlExercises: "https://example.com/form2/3d-exercises", urlQuizes: "https://example.com/form2/quizzes", urlPastYear: "https://example.com/form2/past-year" },
        { name: "Cartesian Plane", urlNotes: "https://example.com/form2/cartesian-notes", urlExercises: "https://example.com/form2/cartesian-exercises", urlQuizes: "https://example.com/form2/quizzes", urlPastYear: "https://example.com/form2/past-year" }
    ],
    form4: [
        { name: "Operation on Sets", urlNotes: "https://drive.google.com/file/d/1NqdfACzqxtk0JufWLmfHZ50DWAYS6bTN/view", urlExercises: "https://example.com/form4/sets-exercises", urlQuizes: "https://example.com/form4/quizzes", urlPastYear: "https://example.com/form4/past-year" },
        { name: "Logical Reasoning", urlNotes: "https://drive.google.com/drive/folders/1G3YTL-3abMbn", urlExercises: "https://drive.google.com/file/d/1xO333B7WJRyVZD5o9HhI46HB4NcWp0kd/view", urlQuizes: "https://quizizz.com/join?gc=33531104", urlPastYear: "https://drive.google.com/drive/folders/1yp3FVYg_RXKXHmq6T3eWRGmAAEI-ie8o" }
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
        });
    }
}

function showLinks() {
    const form = document.getElementById("form").value;
    const topicName = document.getElementById("topic").value;
    const linksDiv = document.getElementById("links");

    linksDiv.innerHTML = ""; // Clear previous links

    if (form && topicName) {
        const selectedTopic = topics[form].find(topic => topic.name === topicName);
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
