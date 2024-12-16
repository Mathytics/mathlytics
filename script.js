const topics = {
    form2: [
        { name: "Three Dimensional Shapes",
         urlNotes: "https://example.com/form2/3d-notes",
         urlExercises: "https://example.com/form2/3d-exercises",
         urlQuizes: "https://example.com/form2/3d-exercises",
         urlPastYear: "https://example.com/form2/3d-exercises"
        },
        { name: "Cartesian Plane",
         urlNotes: "https://example.com/form2/cartesian-notes",
         urlExercises: "https://example.com/form2/cartesian-exercises",
         urlQuizes: "https://example.com/form2/3d-exercises",
         urlPastYear: "https://example.com/form2/3d-exercises"
        }
    ],
    form4: [
        { name: "Operation on Sets",
         urlNotes: "https://drive.google.com/file/d/1NqdfACzqxtk0JufWLmfHZ50DWAYS6bTN/view?usp=sharing",
         urlExercises: "https://example.com/form4/quadratic-exercises",
         urlQuizes: "https://example.com/form2/3d-exercises",
         urlPastYear: "https://example.com/form2/3d-exercises"
        },
        { name: "Logical Reasoning",
         urlNotes: "https://drive.google.com/drive/folders/1G3YTL-3abMbn-eFdZrZA9jez9ynEvshX?usp=drive_link",
         urlExercises: "https://drive.google.com/file/d/1xO333B7WJRyVZD5o9HhI46HB4NcWp0kd/view?usp=drive_link",
         urlQuizes: "https://quizizz.com/join?gc=33531104",
         urlPastYear: "https://drive.google.com/drive/folders/1yp3FVYg_RXKXHmq6T3eWRGmAAEI-ie8o?usp=drive_link"
        }
    ]
};

// Load selected form and topic from localStorage (if available)
window.onload = () => {
    const savedForm = localStorage.getItem('selectedForm');
    const savedTopic = localStorage.getItem('selectedTopic');
    
    if (savedForm) document.getElementById('form').value = savedForm;
    if (savedTopic) document.getElementById('topic').value = savedTopic;

    updateTopics(); // Update topics based on saved form
    showLinks();    // Show links if both form and topic are saved
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
    saveSelection(); // Save the selected form and topic
}

function saveSelection() {
    const form = document.getElementById("form").value;
    const topic = document.getElementById("topic").value;
    
    if (form && topic) {
        localStorage.setItem('selectedForm', form);
        localStorage.setItem('selectedTopic', topic);
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
            const notesLink = document.createElement("a");
            notesLink.href = selectedTopic.urlNotes;
            notesLink.target = "_blank";
            notesLink.textContent = "View Notes";

            const exercisesLink = document.createElement("a");
            exercisesLink.href = selectedTopic.urlExercises;
            exercisesLink.target = "_blank";
            exercisesLink.textContent = "View Exercises";              
            
            const quizzesLink = document.createElement("a");
            quizzesLink.href = selectedTopic.urlQuizes;
            quizzesLink.target = "_blank";
            quizzesLink.textContent = "View Quizzes";

            const pastYearLink = document.createElement("a");
            pastYearLink.href = selectedTopic.urlPastYear;
            pastYearLink.target = "_blank";
            pastYearLink.textContent = "View Past Year";

            linksDiv.appendChild(notesLink);
            linksDiv.appendChild(exercisesLink);
            linksDiv.appendChild(quizzesLink);
            linksDiv.appendChild(pastYearLink);
        }
    } else {
        linksDiv.textContent = "Please select both Form and Topic.";
    }
}

function submitQuery() {
    const queryInput = document.getElementById("queryInput").value;
    if (queryInput.trim() !== "") {
        const messageBox = document.getElementById("messageBox");
        const newMessage = document.createElement("p");
        newMessage.textContent = queryInput;

        // Add a delete button for the new query
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function() {
            messageBox.removeChild(newMessage);
        };

        newMessage.appendChild(deleteBtn);
        messageBox.appendChild(newMessage);
        messageBox.scrollTop = messageBox.scrollHeight; // Auto-scroll
        document.getElementById("queryInput").value = ""; // Clear input
    } else {
        alert("Please enter a query before submitting.");
    }
}
