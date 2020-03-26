const express = require ('express');
const cors = require('cors');
const routes = require ('./routes')


const app = express();

app.use(cors( /** {origin: 'http://meuapp.com} (onde esta hospedada a aplicação) */));
app.use(express.json()); /*avisa o express que no corpo da requisição será escrito codigo em json, e ele ira converter para objeto do javaScript*/ 
app.use (routes); /** precisa ser debaixo dessa linha de info p/ o express */

app.listen(3333);



/***
 * para trabalhar com bancos de dados: 
 * SQL: MySQL, SQLite, PostegreSQL, Oracle, Microsoft SQL Server
 * No SQL: MOngoDB, CouchDB, etc
 * 
 * A diferença eh que os bancos SQL sao melhor estruturados; nos nao sql , um usuario pode ter email, tel, nome, e outro nao
 * 
 * O SQLite é aplicado como um arquivo aqui, e depois posso passar para cada um dos outros bancos 
 */

 /***
  * Driver: SELECT * FROM users .... pega tudo que tem de informação
  * Query Builder: table('users).select('*').where()   ... usa codigo JS para pedir os dados
  */