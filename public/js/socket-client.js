const offline       = document.querySelector('#offline');
const online        = document.querySelector('#online');
const sendMsg       = document.querySelector('#sendMsg');
const buttonSendMsg = document.querySelector('#buttonSendMsg');


const socket = io();

socket.on('connect', () => {

    online.style.display = "";
    offline.style.display = "none";
})

socket.on('disconnect', () => {

    offline.style.display = "";
    online.style.display = "none";
})

socket.on( 'send-msg', ( payload ) =>
{
    console.log(payload);
})

buttonSendMsg.addEventListener( 'click', () => {
    const msg = sendMsg.value;

    const payload = {
        msg,
        id:'12312asdas',
        date: new Date().getTime(),
    }

    socket.emit( 'send-msg', payload, ( id ) => {
        console.log('Mensaje enviado #',id);
    } );
})