const database = require('../database/connection');

const createUser = async (request, response) => {
    try {
        const { 
            nomeUsuario, email, endereco, cidade, estado, cep
        } = request.body;

        if (!nomeUsuario || !email || !endereco || !cidade || !estado || !cep) {
            return response
                .status(400)
                .json({ message: "Os campos não podem ser vazios" })
        }

        database.insert({nomeUsuario, email, endereco, cidade, estado, cep}).table("Usuario").then(data=>{
            console.log(data)
            response.json({ message: "Usuário criado com sucesso!"})
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
        database.select("*").table("Usuario").then(usuarios=>{
            response.json(usuarios)
        })
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: error.message
        })
    }
}

const getById = async (request, response) => {
    try {
        const findId = request.params.idUsuario

        database.select("*").table("Usuario").where({idUsuario:findId}).then(usuario=>{
            response.json(usuario)
        })
    } catch(error) {
        response.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    createUser,
    getAll,
    getById,
}