const database = require('../database/connection');

const createCategoryResidueDiscard = async (request, response) => {
    try {
        const { 
            idCategoria, idPontoDeColeta, idUsuario
        } = request.body;
       

        if (!idCategoria || !idPontoDeColeta || !idUsuario) {
            return response
                .status(400)
                .json({ message: "Os campos não podem ser vazios" })
        }

        database.insert({idCategoria, idPontoDeColeta, idUsuario}).table("CategoriaResiduo_Descarte").then(data=>{
            console.log(data)
            response.json({ message: "Categoria de residuo de um descarte criada com sucesso!"})
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
        database.select("*").table("CategoriaResiduo_Descarte").then(categorias=>{
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
      const idUsuario = request.params.idUsuario;
      const idPontoColeta = request.params.idPontoColeta;
      const idCategoria = request.params.idCategoria;
  
      database
        .select("*")
        .table("CategoriaResiduo_Descarte")
        .where({ idPontoDeColeta: idPontoColeta, idCategoria: idCategoria, idUsuario: idUsuario})
        .then((categoria) => {
          response.json(categoria);
        });
    } catch (error) {
      response.status(500).json({
        message: error.message,
      });
    }
  };

  
// const updateCategoryResidueDiscart = async (request, response) => {
//     try{
//     const findId = request.params.idUsuario
//     const {idCategoria} = request.body

//     database.where({idUsuario:findId}).update({idCategoria:idCategoria}).table("CategoriaResiduo_Descarte").then(data=>{
//             response.json({message: "Categoria de resíduo de um descarte atualizada com sucesso"})
//         })
//     } catch(error) {
//         response.status(500).json({
//             message: error.message
//         })
//     }
// }

const deleteCategoryResidueDiscard = async (request, response) => {
    try {
      const { idCategoria, idPontoColeta, idUsuario } = request.body;
  
      database
        .where({ idCategoria, idPontoColeta, idUsuario})
        .del()
        .table("CategoriaResiduo_Descarte")
        .then((data) => {
          response.json({ message: "Categoria de resíduo de um descarte removida com sucesso" });
        });
    } catch (error) {
      response.status(500).json({
        message: error.message,
      });
    }
  };
  


module.exports = {
    createCategoryResidueDiscard,
    getAll,
    getById,
    //updateCategoryResidueDiscard,
    deleteCategoryResidueDiscard,
}