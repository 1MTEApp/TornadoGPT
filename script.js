
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', sendMessage);

function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    addMessageToChatBox('user', message);
    userInput.value = '';

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: message
                }]
            }]
        })
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = data.candidates[0].content.parts[0].text;
        addMessageToChatBox('bot', botMessage);
    })
    .catch(error => {
        console.error('Ошибка:', error);
        addMessageToChatBox('bot', 'Произошла ошибка при обработке вашего запроса.');
    });
}

function addMessageToChatBox(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
