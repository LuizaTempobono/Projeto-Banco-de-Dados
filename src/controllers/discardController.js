const database = require('../database/connection');

const createDescarte = async (request, response) => {
    try {
        const { 
          idUsuario, idPontoDeColeta, data, hora
        } = request.body;

        if (!idUsuario || !idPontoDeColeta || !data || !hora) {
            return response
                .status(400)
                .json({ message: "Os campos não podem ser vazios" })
        }

        database.insert({idUsuario, idPontoDeColeta, data, hora}).table("Descarte").then(data=>{
            console.log(data)
            response.json({ message: "Descarte criado com sucesso!"})
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: error.message
        })
    }
}

const getAll = async (request, response) => {
    try {
        database.select("*").table("Descarte").then(descartes=>{
            response.json(descartes)
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: error.message
        })
    }
}

const getByIdUsuario = async (request, response) => {
    try {
        const findId = request.params.idUsuario

        database.select("*").table("Descarte").where({idUsuario:findId}).then(descarte=>{
            response.json(descarte)
        })
    } catch(error) {
        response.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    createDescarte,
    getAll,
    getByIdUsuario,
}