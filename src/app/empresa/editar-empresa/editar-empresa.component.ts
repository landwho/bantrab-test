import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EmpresaModel } from '../empresa-model'; 
import { EmpresaService } from '../empresa.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public empresaForm: FormGroup;

  CrearEmpresa: EmpresaModel = new EmpresaModel()
  id:any;
  empresaId:number =0;
  empresa:any;
  error:any;
  isDisabled:boolean = true;

  constructor(private _api:EmpresaService, private _activateRoute : ActivatedRoute, private router: Router) {
    this.empresaForm = this.createForm();
   }

  ngOnInit(): void {

    this._activateRoute.params.subscribe(params => {
      this.id = params
      this.empresaId = this.id.id
      this._api.verEmpresa(this.empresaId).pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        this.empresa = data;
      }) ;
    });
    
  }
  
  get nombre_comercial() {return this.empresaForm.get('nombre_comercial');}
  get razon_social()     {return this.empresaForm.get('razon_social');}
  get telefono()        {return this.empresaForm.get('telefono');}
  get nit()             {return this.empresaForm.get('nit');}
  get correo()           {return this.empresaForm.get('correo')?.disabled;} 
  get estado()          {return this.empresaForm.get('estado');}
  get direccion()       {return this.empresaForm.get('direccion');}

  createForm() {
    return new FormGroup({
      nombre_comercial: new FormControl('', [Validators.required, Validators.minLength(4)]),
      razon_social:     new FormControl('', [Validators.required, Validators.minLength(4)]),
      telefono:         new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(11), Validators.pattern(/^[0-9]\d{6,10}$/)]),
      nit:              new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^[0-9]\d{6,10}$/)]),
      correo:           new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
      estado:           new FormControl('', [Validators.required, Validators.minLength(3)]),
      direccion:        new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  editarEmpresa(): void {

    this.empresaForm.value
    if (this.empresaForm.valid) {
      this._api.editarEmpresa(this.empresaId, this.empresaForm.value).subscribe(data=>{
        Swal.fire("Empresa modificada correctamente.")
        this.router.navigateByUrl('/listar')
      },
      error => {
        this.error = error;
        if(this.error.error.correo){Swal.fire("Correo ya esta registrado")}
        if(this.error.error.razon_social){Swal.fire("Razon social ya esta registrado")}
        if(this.error.error.nit){Swal.fire("El NIT ya esta registrado")}
      }); 
    }

  }

  estados=[
    {"estado":"nuevo"},
    {"estado":"actualizado"},
    {"estado":"activo"},
    {"estado":"inactivo"}
  ]

  ngAfterViewInit(){
    this.isDisabled = true;
  }

  ngOnDestroy(){
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  
}
