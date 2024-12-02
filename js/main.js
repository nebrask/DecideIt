document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = "/home.html";
        });
    }

    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = '/index.html';
        });
    }

    const notificationButton = document.getElementById('notificationButton');
    if (notificationButton) {
        notificationButton.addEventListener('click', () => {
            window.location.href = "/notification.html"; 
        });
    }

    const fabButton = document.querySelector('.fab-button');
    if (fabButton) {
        fabButton.addEventListener('click', createDecision);
    }

    const topicsList = document.querySelector('.topics-list');
    if (topicsList) {
        const decisions = JSON.parse(localStorage.getItem('decisions')) || [];


        if (!decisions.some(d => d.title === "Movie Night")) {
            decisions.push({
                title: "Movie Night",
                participants: 4,
                status: "Closed",
                finalized: true
            });
        }

        localStorage.setItem('decisions', JSON.stringify(decisions));

        topicsList.innerHTML = '';

        decisions.forEach((decision, index) => {
            const topicItem = document.createElement('li');
            topicItem.className = 'topic-item';
            topicItem.setAttribute('data-index', index);
            topicItem.innerHTML = `
                <div class="card-content">
                    <img src="https://img.icons8.com/?size=100&id=143&format=png&color=7950F2" alt="Messages" class="message-icon">
                    <div class="card-text">
                        <h3 class="topic-title">${decision.title}</h3>
                        <p class="topic-summary">${decision.participants} participants</p>
                    </div>
                    <span class="status-label ${decision.status === 'Open' ? 'open' : 'closed'}">${decision.status}</span>
                </div>
            `;

            topicItem.addEventListener('click', () => viewDetails(index));

            topicsList.append(topicItem);
        });
    }
});

function createDecision() {
    window.location.href = "/create-decision.html";
}

function viewDetails(index) {
    const decisions = JSON.parse(localStorage.getItem('decisions')) || [];
    const selectedDecision = decisions[index];
    if (selectedDecision) {
        localStorage.setItem('selectedDecisionIndex', index);
        window.location.href = "/decision-details.html";
    } else {
        alert("Unable to find the selected decision.");
    }
}
