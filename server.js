const app = require('./server/app.js');

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`The app is listening on port ${PORT}`)
})


//inicialização do servidor