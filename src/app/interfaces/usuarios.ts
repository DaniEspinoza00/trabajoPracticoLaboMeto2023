import { Tarjeta } from "./tarjeta";

export interface Usuario{
    id:number,
    nombre:string,
    apellido:string,
    mail:string,
    contra:string,
    documento:string,
    tarjetaCredito:Tarjeta,
    favoritos:number[],//seria el seria/id/isbn del libro
}    
