import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpresaModel } from '../empresa-model'; 
import { EmpresaService } from '../empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-nueva',
  templateUrl: './crear-nueva.component.html',
  styleUrls: ['./crear-nueva.component.css']
})
export class CrearNuevaComponent implements OnInit {

  empresas: EmpresaModel[] = []
  // empresas:any = [];
  constructor(private _api:EmpresaService) {
    this.empresaForm = this.createForm();
    console.log(this.empresas)
   }

  ngOnInit(){}

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public empresaForm: FormGroup;

  get nombre_comercial() {return this.empresaForm.get('nombre_comercial');}
  get razon_social()     {return this.empresaForm.get('razon_social');}
  get telefono()         {return this.empresaForm.get('telefono');}
  get nit()              {return this.empresaForm.get('nit');}
  get correo()           {return this.empresaForm.get('correo');} 
  get estado()           {return this.empresaForm.get('estado');}
  get direccion()        {return this.empresaForm.get('direccion');}

  createForm() {
    return new FormGroup({
      nombre_comercial: new FormControl('', [Validators.required, Validators.minLength(4)]),
      razon_social:     new FormControl('', [Validators.required, Validators.minLength(4)]),
      telefono:         new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(11), Validators.pattern(/^[0-9]\d{6,10}$/)]),
      nit:              new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[0-9]\d{6,10}$/)]),
      correo:           new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      estado:           new FormControl('', [Validators.required, Validators.minLength(3)]),
      direccion:        new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }


  error:any;
  nuevaEmpresa(){
    this.empresaForm.value
    if (this.empresaForm.valid) {
      this._api.crearEmpresa(this.empresaForm.value).subscribe(data=>{
        console.log(data);
        this.empresas.push(this.empresaForm.value);
        Swal.fire("Empresa creada exitosamente!");
      },
      error => {
        this.error = error;
        if(this.error.error.correo){Swal.fire("Correo ya esta registrado")}
        if(this.error.error.razon_social){Swal.fire("Razon social ya esta registrado")}
        if(this.error.error.nit){Swal.fire("El NIT ya esta registrado")}
      })

    }

  }


  estados=[
    {"estado":"nuevo"},
    {"estado":"modificado"},
    {"estado":"activo"},
    {"estado":"inactivo"}
  ]

}
