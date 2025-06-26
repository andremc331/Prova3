import { Router, Request, Response } from "express";
import militar from './militares';
import soldado from './soldados';
import patente from './patentes';
 
const routes = Router();
 
routes.use("/militares", militar);
routes.use("/soldados", soldado);
routes.use("/patentes", patente);
 
//aceita qualquer método HTTP ou URL
routes.use((_: any, res: any) => res.json({ error: "Requisição desconhecida" }));
 
export default routes;