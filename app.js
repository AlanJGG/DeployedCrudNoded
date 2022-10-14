const express = require('express');
const mysql= require('mysql2');
var app = express();
//import {PORT} from './config'
//import {DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT} from './config'

var bodyParser= require('body-parser');

var con= mysql.createConnection({

    host: 'containers-us-west-69.railway.app',
    user: 'root',
    password: 'LFH0vSkxzQPj3FEEolWq',
    database: 'railway',
    port: '7995'
});

con.connect();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.post('/agregarJugador', (req, res)=>{

    let nombre= req.body.nombre
    let posicion= req.body.posicion
    let noJersey= req.body.noJersey
    let id = req.body.id

    con.query('INSERT INTO jugadores VALUES("'+id+'","'+nombre+'","'+posicion+'","'+noJersey+'")' , (err, respuesta, fields)=>{

        if(err) return console.log("error");

        return res.send('Registro exitoso');


    }
    
    );
});

const PORT = process.env.PORT || 7995;
app.listen(PORT, ()=>{

    console.log("Servicio en el puerto", 7995);
}

)
app.post('/eliminarJugador',(req,res)=>{
    let nombre=req.body.usuario;


    con.query('DELETE FROM jugadores where nombre=("'+nombre+'")',(err,respuesta,field)=>{
        if(err) return console.log('ERROR:',err)

        return res.send(`
        <a href="index.html">Inicio</a>
        <h1>Jugador ${nombre} eliminado</h1>`)
    })
});


app.get('/obtenerJugador', (req, res)=>{

    con.query('SELECT * FROM jugadores',(err,respuesta,field)=>{
        if(err) return console.log('ERROR:',err)

        var userHTML=``
        var i=0
        console.log(respuesta)
        userHTML+=`<a href="index.html">Inicio</a><br><br><br>`
        respuesta.forEach(jgd =>{
            i++
            userHTML+=`
            <table>
            <tr><td>${i}</td><td>${jgd.nombre}</td>
            <td>${jgd.posicion}</td></tr>
            <td>${jgd.noJersey}</td></tr>
            
            `
        })

        return res.send(`<table>
            <tr>
                <th>ID: </th>
                <th>Nombre: </th>
                <th>Posicion: </th>
            </tr>
            ${userHTML}
            </table>`)
    })
    }

    );

    app.post('/actualizarJugador',(req,res)=>{
        let nombre=req.body.name;
        let newNoJersey=req.body.newNoJersey
    
    
        con.query('UPDATE jugadores SET noJersey=("'+newNoJersey+'") WHERE nombre=("'+nombre+'")',(err,respuesta,field)=>{
            if(err) return console.log('ERROR:',err)
    
            return res.send(`
            <a href="index.html">Inicio</a>
            <h1>Jugador ${nombre} cambiado a: <h3>${newNoJersey}</h3></h1>
            `)
        })
    });
    
;