const database = require('../database/connection');

const createCategoryDiscardPoint = async (request, response) => {
    try {
        const { 
            idCategoria, idPontoDeColeta
        } = request.body;
       

        if (!idCategoria || !idPontoDeColeta) {
            return response
                .status(400)
                .json({ message: "Os campos não podem ser vazios" })
        }

        database.insert({idCategoria, idPontoDeColeta}).table("categoriar_pontodecoleta").then(data=>{
            console.log(data)
            response.json({ message: "Categoria de residuo criada com sucesso!"})
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
        database.select("*").table("categoriar_pontodecoleta").then(categorias=>{
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
      const idPontoColeta = request.params.idPontoColeta;
      const idCategoria = request.params.idCategoria;
  
      database
        .select("*")
        .table("categoriar_pontodecoleta")
        .where({ idPontoDeColeta: idPontoColeta, idCategoria: idCategoria })
        .then((categoria) => {
          response.json(categoria);
        });
    } catch (error) {
      response.status(500).json({
        message: error.message,
      });
    }
  };

  
// const updateCategoryDiscardPoint = async (request, response) => {
//     try{
//     const findId = request.params.idPontoDeColeta
//     const {idCategoria} = request.body

//     database.where({idPontoDeColeta:findId}).update({idCategoria:idCategoria}).table("categoriar_pontodecoleta").then(data=>{
//             response.json({message: "Categoria de resíduo atualizada com sucesso"})
//         })
//     } catch(error) {
//         response.status(500).json({
//             message: error.message
//         })
//     }
// }

const deleteCategoryDiscardPoint = async (request, response) => {
    try {
      const { idCategoria, idPontoColeta } = request.body;
  
      database
        .where({ idCategoria, idPontoColeta})
        .del()
        .table("categoriar_pontodecoleta")
        .then((data) => {
          response.json({ message: "Categoria de resíduo removida com sucesso" });
        });
    } catch (error) {
      response.status(500).json({
        message: error.message,
      });
    }
  };
  


module.exports = {
    createCategoryDiscardPoint,
    getAll,
    getById,
    //updateCategoryDiscardPoint,
    deleteCategoryDiscardPoint,
}