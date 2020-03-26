//cadastro das ongs
const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async index (request, response){
        const ongs = await connection('ongs').select('*');  //seleciona todos os dados de todos oc calpos da tabela ongs
    
        return response.json(ongs);
    },

    async create (request, response) {
        const { name, email, whatsapp, city, uf } = request.body; //desestruturação feita para que o usuario nao responda com nada alem do que queremos

        const id = crypto.randomBytes(4).toString('HEX'); //gera uma id de 4 bites em codigo hexadecimal
    
        await connection('ongs').insert({ //tem q esperar receber a requisição para continuar o codigo
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({id});
    }
};