import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { EmpresaModel } from './empresa-model'; 

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http:HttpClient){}
  
  totalAngularPackages:any;
  errorMessage:any;

  url='https://apitest-bt.herokuapp.com/api/v1/empresas';

  getListEmpresas(){
    const headers = { 'user': 'User123', 'password': 'Password123' }
    return this.http.get<EmpresaModel>('https://apitest-bt.herokuapp.com/api/v1/empresas', { headers });
  }
  verEmpresa(id:number){
    const headers = { 'user': 'User123', 'password': 'Password123' }
    return this.http.get<EmpresaModel>('https://apitest-bt.herokuapp.com/api/v1/empresas/'+id, { headers });
  }
  crearEmpresa(obj:any){
      const headers = { 'user': 'User123', 'password': 'Password123' }
    return this.http.post('https://apitest-bt.herokuapp.com/api/v1/empresas',obj, { headers });
  }
  editarEmpresa(id:number,obj:any){
      const headers = { 'user': 'User123', 'password': 'Password123' }
    return this.http.put<EmpresaModel>('https://apitest-bt.herokuapp.com/api/v1/empresas/'+id,obj ,{ headers });
  }
  eliminarEmpresa(id:number){
      const headers = { 'user': 'User123', 'password': 'Password123' }
    return this.http.delete<EmpresaModel>('https://apitest-bt.herokuapp.com/api/v1/empresas/'+id, { headers });
  }


}




