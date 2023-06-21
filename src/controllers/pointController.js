const database = require('../database/connection');

const createPoint = async (request, response) => {
  try {
    const { 
        endereco, cidade, estado, cep, telefone, horarioAbertura, horarioFechamento
    } = request.body;

    if (!endereco || !cidade || !estado || !cep || !telefone 
      || !horarioAbertura || !horarioFechamento
      ) {
        return response
            .status(400)
            .json({ message: "Os campos não podem ser vazios" })
    }

    database.insert({endereco, cidade, estado, cep, telefone, horarioAbertura, horarioFechamento}).table("PontoDeColeta").then(data=>{
        console.log(data)
        response.json({ message: "Ponto de coleta criado com sucesso!"})
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
      database.select("*").table("PontoDeColeta").then(pontos=>{
          response.json(pontos)
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
      const findId = request.params.idPontoDeColeta

      database.select("*").table("PontoDeColeta").where({idPontoDeColeta:findId}).then(ponto=>{
          response.json(ponto)
      })
  } catch(error) {
      response.status(500).json({
          message: error.message
      })
  }
}

const updatePoint = async (request, response) => {
    try{
    const findId = request.params.idPontoDeColeta
    const {endereco, cidade, estado, cep, telefone, horarioAbertura, horarioFechamento} = request.body

    database.where({idPontoDeColeta:findId}).update({endereco:endereco, 
        cidade:cidade, estado:estado, cep:cep, telefone:telefone, 
        horarioAbertura:horarioAbertura, horarioFechamento:horarioFechamento})
        .table("PontoDeColeta").then(data=>{
            response.json({message: "Ponto de coleta atualizado com sucesso"})
        })
    } catch(error) {
        response.status(500).json({
            message: error.message
        })
    }
}

const deletePoint = async (request, response) => {
    try{
    const findId = request.params.idPontoDeColeta

    database.where({idPontoDeColeta:findId}).del().table("PontoDeColeta").then(data=>{
            response.json({message: "Ponto de coleta removido com sucesso"})
        })
    } catch(error) {
        response.status(500).json({
            message: error.message
        })
    }
}



module.exports = {
  createPoint,
  getAll,
  getById,
  updatePoint,
  deletePoint,
}