const express = require('express');
const sequelize = require('./config/database');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
});