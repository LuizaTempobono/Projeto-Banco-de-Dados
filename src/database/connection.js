var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',    
        user : 'root',      
        password : 'estudante',  
        database : 'PROJETOBD' 
     }
});
module.exports = knex