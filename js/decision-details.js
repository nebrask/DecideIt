document.addEventListener('DOMContentLoaded', () => {
    const decisions = JSON.parse(localStorage.getItem('decisions')) || [];
    const selectedDecisionIndex = parseInt(localStorage.getItem('selectedDecisionIndex'), 10);
    const decision = decisions[selectedDecisionIndex] || {
        title: "Mock Decision Title",
        description: "This is a description for the decision.",
        options: [],
        messages: [],
        participants: 1,
        status: 'Open',
        finalized: false
    };


    decision.options = decision.options || [];
    decision.messages = decision.messages || [];


    if (decision.title === "Movie Night" && decision.messages.length === 0) {
        const joiningMessages = [
            { 
                content: `
                    <img src="https://img.icons8.com/?size=100&id=98957&format=png&color=1A1A1A" alt="User Icon" class="user-icon"> 
                    John Doe has joined the chat
                `, 
                isSystem: true 
            },
            { 
                content: `
                    <img src="https://img.icons8.com/?size=100&id=98957&format=png&color=1A1A1A" alt="User Icon" class="user-icon"> 
                    Jane Smith has joined the chat
                `, 
                isSystem: true 
            },
            { 
                content: `
                    <img src="https://img.icons8.com/?size=100&id=98957&format=png&color=1A1A1A" alt="User Icon" class="user-icon"> 
                    Alex Brown has joined the chat
                `, 
                isSystem: true 
            },
            { 
                content: `I think we should watch an action movie😀`, 
                isSystem: false, 
                userName: "You" 
            },
            { 
                content: `How about we watch comedy🤔`, 
                isSystem: false, 
                userName: "John Doe" 
            },
            { 
                content: `It would be great to spend time with everyone laughing and having fun`, 
                isSystem: false, 
                userName: "John Doe" 
            },
            { 
                content: `I'm in for a drama!`, 
                isSystem: false, 
                userName: "Jane Smith" 
            },
            { 
                content: `I'm leaning towards comedy also but I'm fine for whatever. Lets all vote and decide!`, 
                isSystem: false, 
                userName: "Alex Brown " 
            }
        ];
        
        decision.messages = [...joiningMessages, ...decision.messages];
        decision.participants = 4;

        decision.options = [
            { name: "Comedy", votes: 2 },
            { name: "Action", votes: 1 },
            { name: "Drama", votes: 1 }
        ];

        const finalDecisionMessage = `
            <strong>Final Decision</strong> Comedy won with 2 votes!
            <br><br>
            <hr>
            <ul>
                <li><strong>Comedy</strong> 2 votes</li>
                <li><strong>Action</strong> 1 vote</li>
                <li><strong>Drama</strong> 1 vote</li>
            </ul>
        `;
        
        decision.messages.push({
            content: finalDecisionMessage,
            isSystem: true
        });
    
    }

    

    if (!decision.participants || decision.participants < 1) {
        decision.participants = 1;
    }

    if (decision.finalized) {
        const voteButton = document.getElementById('voteButton');
        const addUserButton = document.getElementById('addUserButton');
        const finalizeButton = document.getElementById('finalizeButton');
        
        voteButton.disabled = true;
        addUserButton.disabled = true;
        
        voteButton.style.display = 'none';
        addUserButton.style.display = 'none';
        finalizeButton.style.display = 'none';
    }

    
    

    const decisionTitleElement = document.getElementById('decisionTitle');
    
    if (decision.finalized) {
        decisionTitleElement.textContent = `${decision.title} - Closed`;
    } else {
        decisionTitleElement.textContent = decision.title;
    }
    decisionTitleElement.textContent = decision.title;

    const votePopupTitle = document.getElementById('votePopupTitle');
    votePopupTitle.textContent = `Vote for ${decision.title}`;
    const voteDescriptionElement = document.getElementById('voteDescription');
    voteDescriptionElement.textContent = decision.description || "No description available.";

    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        window.location.href = '/home.html';
    });

    const discussionContainer = document.getElementById('discussionContainer');
    const messageInput = document.getElementById('messageInput');
    const isMessageInputDisabled = localStorage.getItem('messageInputDisabled') === 'true';

    if (decision.finalized) {
        messageInput.disabled = true;
        messageInput.placeholder = "Voting finalized, cannot message.";
    } else {
        messageInput.disabled = false;
        messageInput.placeholder = "Type your message...";
    }
    const sendMessageButton = document.getElementById('sendMessageButton');

    const saveDecisionToLocalStorage = () => {
        decisions[selectedDecisionIndex] = decision;
        localStorage.setItem('decisions', JSON.stringify(decisions));
    };

    const renderMessages = () => {
        discussionContainer.innerHTML = '';
    
        decision.messages.forEach(message => {
            const messageWrapper = document.createElement('div');
    
            if (message.isSystem) {
                messageWrapper.className = 'system-message-wrapper';
                messageWrapper.innerHTML = `
                    <div class="system-message">
                        <span>${message.content}</span>
                    </div>
                `;
            } else {
                messageWrapper.className = 'user-message-wrapper';
    
                const userLabel = message.userName === "You" ? "You" : message.userName;
                const sideClass = message.userName === "You" ? 'right' : 'left';
    
                messageWrapper.innerHTML = `
                    <div class="user-message ${sideClass}">
                        <span class="user-label">${userLabel}</span>
                        <div class="user-message-bubble">${message.content}</div>
                    </div>
                `;
            }
    
            discussionContainer.appendChild(messageWrapper);
        });
    
        discussionContainer.scrollTop = discussionContainer.scrollHeight;
    };
    
    
    renderMessages();

    sendMessageButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            decision.messages.push({ content: message, isSystem: false, userName: "You" });
            saveDecisionToLocalStorage();
            messageInput.value = '';
            renderMessages();
        }
    });

    renderMessages();

    const voteButton = document.getElementById('voteButton');
    const votePopup = document.getElementById('votePopup');
    const voteOptionsList = document.getElementById('voteOptionsList');
    const cancelVoteButton = document.getElementById('cancelVoteButton');
    const submitVoteButton = document.getElementById('submitVoteButton');

    let selectedOptionName = null;

    voteButton.addEventListener('click', () => {
        votePopup.classList.remove('hidden');
        populateVoteOptions();
    });

    cancelVoteButton.addEventListener('click', () => {
        votePopup.classList.add('hidden');
    });

    submitVoteButton.addEventListener('click', () => {
        if (selectedOptionName) {
            const selectedOptionObject = decision.options.find(option => option.name === selectedOptionName);
            if (selectedOptionObject) {
                selectedOptionObject.votes += 1;
            }

            saveDecisionToLocalStorage();
            
            votePopup.classList.add('hidden');
            populateVoteOptions();
        } else {
            alert('Please select an option before submitting your vote.');
        }
    });

    function populateVoteOptions() {
        voteOptionsList.innerHTML = '';
        if (decision.options && decision.options.length > 0) {
            decision.options.forEach(option => {
                const optionItem = document.createElement('li');
                optionItem.className = 'vote-option-item';
    
                const userVote = localStorage.getItem(`userVote_${selectedDecisionIndex}`);
                const isSelected = userVote === option.name;
    
                if (isSelected) {
                    optionItem.classList.add('selected');
                }
        
                optionItem.innerHTML = `
                <div class="vote-option-container">
                    <span class="vote-checkmark">✔</span>
                    <label>
                        <input type="radio" name="voteOption" value="${option.name}">
                        ${option.name}
                    </label>
                    <span class="vote-count">Votes: ${option.votes || 0}</span>
                </div>
            `;
    
                optionItem.addEventListener('click', () => {
                    selectedOptionName = option.name;
    
                    document.querySelectorAll('.vote-option-item').forEach(item => item.classList.remove('selected'));
                    optionItem.classList.add('selected');
                });
    
                voteOptionsList.appendChild(optionItem);
            });
        } else {
            const noOptionsItem = document.createElement('li');
            noOptionsItem.className = 'vote-option-item system-message';
            noOptionsItem.textContent = 'No voting options available for this discussion.';
            voteOptionsList.appendChild(noOptionsItem);
        }
    }
    

    const addUserButton = document.getElementById('addUserButton');
    const addUserPopup = document.getElementById('addUserPopup');
    const cancelPopupButton = document.getElementById('cancelPopupButton');
    const savePopupButton = document.getElementById('savePopupButton');
    const newUserInput = document.getElementById('newUserInput');

    addUserButton.addEventListener('click', () => {
        addUserPopup.classList.remove('hidden');
    });

    cancelPopupButton.addEventListener('click', () => {
        newUserInput.value = '';
        addUserPopup.classList.add('hidden');
    });

    savePopupButton.addEventListener('click', () => {
        const newUser = newUserInput.value.trim();
        if (newUser) {
            decision.participants += 1;

            decision.messages.push({
                content: `
                <img src="https://img.icons8.com/?size=100&id=98957&format=png&color=1A1A1A" alt="Add User Icon" class="user-icon"> 
                ${newUser} has joined the chat
                `,
                isSystem: true,
            });

            saveDecisionToLocalStorage();
            alert(`User "${newUser}" added to the discussion!`);
            newUserInput.value = '';
            addUserPopup.classList.add('hidden');
            renderMessages();
        } else {
            alert('Please enter a valid username or email.');
        }
    });

    const finalizeButton = document.getElementById('finalizeButton');
    const finalDecisionSection = document.getElementById('finalDecisionSection');
    const finalDecisionContent = document.getElementById('finalDecisionContent');

    finalizeButton.addEventListener('click', () => {
        decision.status = 'Closed';
        decision.finalized = true; 
        saveDecisionToLocalStorage();
    
        const decisionTitleElement = document.getElementById('decisionTitle');
        decisionTitleElement.textContent = `${decision.title} - Closed`;
    
        const messageInput = document.getElementById('messageInput');
        messageInput.disabled = true;
        messageInput.placeholder = "Voting finalized, you cannot message.";
    
        localStorage.setItem('messageInputDisabled', 'true');
    
        let finalDecision = decision.options.reduce((max, option) => {
            return (max.votes > option.votes) ? max : option;
        });
    
        let finalDecisionMessage = `
            <strong>Final Decision</strong> ${finalDecision.name} won with ${finalDecision.votes} votes!
            <br><br>
            <hr>
            <ul>
                ${decision.options.map(option => `
                    <li><strong>${option.name}</strong> ${option.votes} votes</li>
                `).join('')}
            </ul>
        `;
    
        const finalDecisionMsg = {
            content: finalDecisionMessage,
            isSystem: true,
        };
    
        decision.messages.push(finalDecisionMsg);
        saveDecisionToLocalStorage();
    
        const voteButton = document.getElementById('voteButton');
        const addUserButton = document.getElementById('addUserButton');
        finalizeButton.disabled = true;
        
        voteButton.disabled = true;
        addUserButton.disabled = true;
        
        voteButton.style.display = 'none';
        addUserButton.style.display = 'none';
        finalizeButton.style.display = 'none';
    
        renderMessages();
    });

});
