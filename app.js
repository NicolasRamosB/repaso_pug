// Express require
const express = require('express');

// Lodash require
const _ = require('lodash')

// Dorenv require
require('dotenv').config();


// Declaro app
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Instancia Pug
app.set('views', './views');
app.set('view engine', 'pug');

// Status del server
app.get('/health', (_req, res) => {
    res.status(200).json({
        success:true,
        environment: process.env.ENVIRONMENTS || 'undifined',
        health: 'Up'
    })
});

app.get('/', (_req, res) => {
    res.status(200).json({
        success:true,
        title: 'Metricas',
        router: '/datos?min=0&level=11&max=20&title=Metrica'
    })
});

app.get('/datos', (req, res) => {
    const { min, max, level, title }=req.query;
    if (_.isNil(min) || _.isNil(max) || _.isNil(level) || _.isNil(title)) {
        return res.render('error', {error: "Faltan parametros"});
    }
    // Rango del volumen visto
    const diff = parseInt(max) - parseInt(min);
    // Escala de nivel real
    const realLevel = parseInt(level) - parseInt(min);

    // Calculo de valores, Decimal
    const perLevel = realLevel / diff;

    // Evaluar que el nivel no se pase de los rangos
    if (parseInt(level) > parseInt(max) || parseInt(level) < parseInt(min)) {
        return res.render('error', {error: "Nivel fuera de rango"});
        
    }
    // Renderiso datos
    res.render('datos', {max, min, perLevel, title})
})

module.exports = app;