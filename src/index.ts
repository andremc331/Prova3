import express from "express";
import routes from './routes/index';
import dotenv from "dotenv";
import connect from "./schemas/connection";
 
dotenv.config({ path: '/' });
 
// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3001;
 
console.log(process.env.PORT);
console.log(PORT);
 
const app = express(); // cria o servidor e coloca na variável app
// suportar parâmetros JSON no body da requisição
app.use(express.json());
 
// conecta ao MongoDB no início da aplicação
connect();
 
// inicializa o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});
 
// define a rota para o pacote /routes
app.use(express.json());
 
app.use(routes);