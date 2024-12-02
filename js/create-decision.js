document.addEventListener('DOMContentLoaded', () => {
    const addOptionButton = document.getElementById('addOptionButton');
    const optionsContainer = document.getElementById('optionsContainer');
    const newOptionInput = document.getElementById('newOption');
    const saveButton = document.getElementById('saveButton');
    const cancelButton = document.getElementById('cancelButton');

    addOptionButton.addEventListener('click', () => {
        const optionText = newOptionInput.value.trim();

        if (optionText) {
            const optionCard = document.createElement('div');
            optionCard.className = 'option-card';

            const optionTextElement = document.createElement('span');
            optionTextElement.className = 'option-text';
            optionTextElement.textContent = optionText;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-option';
            deleteButton.textContent = '×';

            optionCard.appendChild(optionTextElement);
            optionCard.appendChild(deleteButton);
            optionsContainer.appendChild(optionCard);

            newOptionInput.value = '';

            deleteButton.addEventListener('click', () => {
                optionsContainer.removeChild(optionCard);
            });
        } else {
            alert('Please enter a valid option.');
        }
    });

    cancelButton.addEventListener('click', () => {
        window.location.href = '/home.html';
    });

    saveButton.addEventListener('click', () => {
        const title = document.getElementById('decisionTitle').value.trim();
        const description = document.getElementById('decisionDescription').value.trim();
        const options = Array.from(optionsContainer.children).map(optionCard =>
            optionCard.querySelector('.option-text').textContent
        );

        if (!title) {
            alert('Please enter a title for the decision.');
            return;
        }

        if (options.length === 0) {
            alert('Please add at least one option.');
            return;
        }

        const optionsWithVotes = options.map(option => ({ name: option, votes: 0 }));

        const decisions = JSON.parse(localStorage.getItem('decisions')) || [];
        decisions.unshift({
            title,
            description,
            options: optionsWithVotes,
            participants: 1,
            status: 'Open',
        });
        localStorage.setItem('decisions', JSON.stringify(decisions));

        window.location.href = '/home.html';
    });
});
