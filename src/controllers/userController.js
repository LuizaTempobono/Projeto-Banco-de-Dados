//const { response } = require('express');
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


const updateUser = async (request, response) => {
    try{
    const findId = request.params.idUsuario 
    const {email, endereco, cidade, estado, cep} = request.body

    database.where({idUsuario:findId}).update({email:email, endereco:endereco, 
        cidade:cidade, estado:estado, cep:cep}).table("Usuario").then(data=>{
            response.json({message: "Usuario atualizado com sucesso"})
        })
    } catch(error) {
        response.status(500).json({
            message: error.message
        })
    }
}

const deleteUser = async (request, response) => {
    try{
    const findId = request.params.idUsuario 

    database.where({idUsuario:findId}).del().table("Usuario").then(data=>{
            response.json({message: "Usuario removido com sucesso"})
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
    updateUser,
    deleteUser,
}