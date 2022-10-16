const express = require('express');
const app = express();
const mongoose = require('mongoose');
const TareaSchema = require('./modelos/Tarea.js');
const router = express.Router();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(router);
mongoose.connect('mongodb+srv://misiontic:abcd1234@misiontic.tcktd3p.mongodb.net/expressg68?retryWrites=true&w=majority');

app.listen(3000, () => {
    console.log('Escuchando por puerto 3000');
});

router.get('/', (req, res) => {
    res.send('Inicio de la API');
});

router.post('/tarea', (req, res) => {
    let nuevaTarea = new TareaSchema({
        idTarea: req.body.id,
        nombreTarea: req.body.nombre,
        detalleTarea: req.body.detalle
    });
    nuevaTarea.save(function(err, datos){
        if (err) {
            console.log(err);
        }
        else{
            res.send('Tarea almacenada correctamente');
        }
    });
});

router.get('/tarea', (req, res) => {
    TareaSchema.find(function(err, datos){
        if (err) {
            console.log("Error leyendo las tareas");
        }
        else{
            res.send(datos);
        }
    });
});
