$( document ).ready(function() {
    const socket = io.connect('/' || 'http://localhost:3000');

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
    message.value = ''
})

message.addEventListener('keypress', ()=> {
    socket.emit('typing', {
        user: user.val()
    })
})

socket.on('chat', (data)=> {
    let time = new Date();
    let myTime = '['+ time.getHours() + ':' + time.getMinutes() + ']'
   output.innerHTML += '<p><strong>' + myTime + " " + data.user + ': ' + ' </strong> ' + data.message + '</p>'
   feedback.innerHTML = '';
})



socket.on('typing', (data) => {
    feedback.innerHTML = '<p>' + data.user + ' is typing a message...</p>'
})

});