const socketController = (socket) => 
{
    console.log('Cliente conecta3');

    socket.on('disconnect', () => 
    {
        console.log('Cliente desconecta3');
    })

    socket.on('send-msg', ( payload, callback ) => {

        const uuid = 'AFEQ12Gc!sd#12';
        callback( uuid )

        socket.broadcast.emit('send-msg', payload);
    })
};

module.exports = socketController;