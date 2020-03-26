const connection = require ('../database/connection');

module.exports = {
   //listagem
    async index(request, response) {

        const{page = 1} = request.query;

        const [count] = await connection('incident').count(); //para ver o total de casos 
        //essa resposta do total de algo eh enviado pelo header da resposta

        const incidents = await connection('incident')
        .join('ongs', 'ong_id', '=', 'incident.ong_id')
        .limit(5)           // limite para mostrar apenas cinco incidentes por vez
        .offset((page-1)*5)  //5 registros por pagina, aqui ele pega os 5 proximos registros (define isso matematicamente)
        .select(['incident.*',  //todos os dados dos incidents
        'ongs.name',      //dados expecíficos das ongs
        'ongs.email',    
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
        
    },
    //postagem de incidentes
    async create(request, response){
        const {title, description, value} = request.body; //o id da ong precisa ser autenticado (no login), aqui se trbalha nisso no header da requisição
        const ong_id = request.headers.authorization;// para ser autorizada a criação precisa da id da ONG

        const [id] = await connection('incident').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete( request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incident')
            .where('id', id)   //para uma ong apagar apenas os seus casos
            .select('ong_id')   //apenas a coluna ong_id
            .first(); //para retornar apenas um resultado, pois cada registro tem dua propria id de incident

        if (incident.ong_id != ong_id) {  //para verificar se o id da ong no banco de dados é diferente do id logado na aplicação, e gerar um erro
            return response.status(401).json({error: 'Operation not permitted.'}) //é o cod de nao autorizado ( para mais, estude http status code)
        }
//se esta tudo certo, deletar:

        await connection('incident').where('id', id).delete(); 

        return response.status(204).send(); // esse codigo informa resposta sem conteudo
    }
};