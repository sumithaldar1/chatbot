const chatform = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

//get user and run from url
const { username, room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
});


const socket= io();

//join chatroom
socket.emit('joinroom',{username, room});

//from server
socket.on('message',message =>{
    console.log(message);
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;

});

//Messsage submit

chatform.addEventListener('submit',(e) =>{
    e.preventDefault();
    const msg=e.target.elements.msg.value;
    socket.emit('chatMessage',msg);
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
});

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
       ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}