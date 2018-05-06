$( document ).ready(function() {
    const socket = io.connect('/');

    let user = $('#name');
    let message = document.getElementById('message');
    let btn = $('#send');
    let output = document.getElementById('output');
    let feedback = document.getElementById('feedback'); 

//Emit events
btn.click(() => {
    socket.emit('chat', {
        user: user.val(),
        message: message.value
    })
})

message.addEventListener('keypress', ()=> {
    socket.emit('typing', {
        user: user.val()
    })
})

socket.on('chat', (data)=> {
   output.innerHTML += '<p><span>' + data.user + ': ' + ' </span> ' + data.message + '</p>'
   feedback.innerHTML = '';
   message.innerHTML = '';
})

socket.on('typing', (data) => {
    feedback.innerHTML = '<p>' + data.user + ' is typing a message...</p>'
})

});