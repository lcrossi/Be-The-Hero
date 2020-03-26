const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//fazendo login
routes.post('/sessions', SessionController.create); //eh relativo a criar uma sessão

//listagem de ongs:
routes.get('/ongs', OngController.index);

//cadastro das ongs
routes.post('/ongs', OngController.create);

//perfil ong
routes.get('/profile', ProfileController.index);

//listagem de incidentes
routes.get('/incidents', IncidentController.index);

//postagem de incidents
routes.post('/incidents', IncidentController.create);

//deletar incidentes
routes.delete('/incidents/:id', IncidentController.delete);


module.exports = routes;