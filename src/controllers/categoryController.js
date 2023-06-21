const database = require('../database/connection');

const createCategory = async (request, response) => {
    try {
        const { 
            descricao
        } = request.body;

        if (!descricao) {
            return response
                .status(400)
                .json({ message: "Os campos não podem ser vazios" })
        }

        database.insert({descricao}).table("Categoria_Residuo").then(data=>{
            console.log(data)
            response.json({ message: "Categoria criada com sucesso!"})
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
        database.select("*").table("Categoria_Residuo").then(categorias=>{
            response.json(categorias)
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
        const findId = request.params.idCategoria

        database.select("*").table("Categoria_Residuo").where({idCategoria:findId}).then(categoria=>{
            response.json(categoria)
        })
    } catch(error) {
        response.status(500).json({
            message: error.message
        })
    }
}


const updateCategory = async (request, response) => {
    try{
    const findId = request.params.idCategoria
    const {descricao} = request.body

    database.where({idCategoria:findId}).update({descricao:descricao}).table("Categoria_Residuo").then(data=>{
            response.json({message: "Categoria atualizada com sucesso"})
        })
    } catch(error) {
        response.status(500).json({
            message: error.message
        })
    }
}

const deleteCategory = async (request, response) => {
    try{
    const findId = request.params.idCategoria

    database.where({idCategoria:findId}).del().table("Categoria_Residuo").then(data=>{
            response.json({message: "Categoria removida com sucesso"})
        })
    } catch(error) {
        response.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    createCategory,
    getAll,
    getById,
    updateCategory,
    deleteCategory,
}