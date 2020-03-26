const connection = require ('../database/connection');

module.exports ={
    async create(request,response){
        const { id } = request.body;  //o id da ong vem do corpo da requisição

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first(); //espero apenas um resultado, assim ele me entrega um array

        if(!ong){
            return response.status(400).json({ error: 'No ONG found with this id.'});
        }

    return response.json(ong);
    }
}