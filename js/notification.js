document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('backButton');
    const notificationContainer = document.querySelector('.notification-content');
    

    const notifications = {
        'New Update': [
            'A new update is available for your decision topic.',
            'Your decision has been updated with new changes.'
        ],
        'New Message': [
            'You have a new message!',
            'Someone has commented on your decision topic.'
        ],
        'Action Required': [
            'Your decision topic is up for voting!',
            'Please finalize your decision soon.'
        ],
        'System Update': [
            'System maintenance is scheduled for tomorrow.',
            'New features have been added to the platform.'
        ],
        'New Activity': [
            'Someone has voted on your decision topic.',
            'A new user has joined the decision.'
        ],
        'Reminder': [
            'Reminder: you need to vote soon',
            'Don’t forget to check the latest updates on your decision topic.'
        ]
    };

    backButton.addEventListener('click', () => {
        window.location.href = '/home.html';
    });


    function createNotification() {
        const randomTitle = Object.keys(notifications)[Math.floor(Math.random() * Object.keys(notifications).length)];

        const randomMessage = notifications[randomTitle][Math.floor(Math.random() * notifications[randomTitle].length)];

        const notificationElement = document.createElement('div');
        notificationElement.classList.add('notification-container');

        notificationElement.innerHTML = `
            <div class="notification-title">${randomTitle}</div>
            <div class="notification-message">${randomMessage}</div>
        `;

        notificationContainer.prepend(notificationElement);
    }

    setInterval(createNotification, 5000);
});
