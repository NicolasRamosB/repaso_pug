// Import fail app
const app = require('./app');

// Inicio server
const PORT = process.env.PORT || 3000
// Notifico funcionamiento del server
app.listen(PORT, () => console.info(`Server up and running on ${PORT}`));