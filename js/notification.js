document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('backButton');
    const notificationContainer = document.querySelector('.notification-content');
    

    const notifications = {
        'New Update': [
            'A new update is available for your discussion.',
            'Your discussion has been updated with new changes.'
        ],
        'New Message': [
            'You have a new message!',
            'Someone has commented on your discussion.'
        ],
        'Action Required': [
            'Your discussion is up for voting!',
            'Please finalize your decision before soon.'
        ],
        'System Update': [
            'System maintenance is scheduled for tomorrow.',
            'New features have been added to the platform.'
        ],
        'New Activity': [
            'Someone has voted on your discussion topic.',
            'A new user has joined the discussion.'
        ],
        'Reminder': [
            'Reminder: you need to vote soon',
            'Don’t forget to check the latest updates on your discussion.'
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
