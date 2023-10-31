import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  urlClientes:string='http://localhost:4000/clientes'
  constructor(private router:Router) { }

  async getClientes():Promise < Cliente[]| undefined>{
    try{                                              
      const resultado = await fetch (this.urlClientes,{method:'GET'})
      const cliente = resultado.json();
      return cliente;
    }catch(error){
      console.log(error);
    }
    return undefined;
  }

  async postCliente(cliente:Cliente){
    try {
      await fetch (this.urlClientes,{method:'POST',
      body:JSON.stringify(cliente),
      headers:{'Content-type':'application/json'}})
      this.router.navigate(['home'])
    } catch (error) {
      console.log(error);
    }
  }
  async deleteCliente(id:number){
    try {
      await fetch(`${this.urlClientes}/${id}`,{method:'DELETE'})
      this.router.navigate(['home'])
    } catch (error) {
      console.log(error);
    }
  }

  async getCliente(id:number): Promise< Cliente | undefined>{
    try{

      const resultado = await fetch (`${this.urlClientes}/${id}`)
      const cliente = resultado.json();
      return cliente;
    }catch(error){
      console.log(error);
    }
    return undefined;
  }

   async putCliente(cliente:Cliente){
      try {
        await fetch(`${this.urlClientes}/${cliente.id}`, {method:'PUT',
        body: JSON.stringify(cliente),
        headers:{'Content-type': 'application/json'}})
        this.router.navigate (['home'])
      } catch (error) {
        console.log(error);
      }
   }
    
}
