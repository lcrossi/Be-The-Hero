const connection = require ('../database/connection');

module.exports = {
    async index(request, response){
        const ong_id = request.headers.authorization;  //acessando os dados de uma ong que esta logada 
    
        const incidents = await connection ('incident') //busca os incidentes
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidents);

    }
}