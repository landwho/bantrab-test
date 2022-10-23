import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EmpresaModel } from '../empresa-model'; 
import { EmpresaService } from '../empresa.service';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CrearNuevaComponent } from '../crear-nueva/crear-nueva.component';

@Component({
  selector: 'app-listar-empresa',
  templateUrl: './listar-empresa.component.html',
  styleUrls: ['./listar-empresa.component.css']
})
export class ListarEmpresaComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  empresas:any;

  constructor(private _api:EmpresaService, private router:Router, public dialog:MatDialog) 
  { }

    ngOnInit(): void {
      this.getLista()
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(CrearNuevaComponent, {
        width: '70%',
        data: {empresa:this.empresas},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        console.log('The dialog was closed');
        
      });
    }

  getLista(){
    this._api.getListEmpresas().pipe(takeUntil(this._unsubscribeAll))
    .subscribe((data) => {
      this.empresas = data;
    });
  }

  verEmpresa(id:number){
    let url = `/detalle/empresa/${id}`    
    this.router.navigateByUrl(url)    
  }

  editarEmpresa(id:number){
    let url = `/editar/empresa/${id}`    
    this.router.navigateByUrl(url)
  }
 
  eliminar(id:number, element:any){
    Swal.fire({
      title: 'Estas Seguro de Eliminar Este Elemento?',
      text: "Esta accion no puede ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7066e0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empresas.forEach((value:any, index:any) => {
          if (value == element) {
            this.empresas.splice(index, 1);
              this._api.eliminarEmpresa(id).pipe(takeUntil(this._unsubscribeAll))
              .subscribe((data) => {
              console.log(data);
              Swal.fire(
                'Eliminado!',
                'Empresa fue eliminada exitosamente.',
                'success',
              )
            });
          }
        });
      }
    });
  }

  ngOnDestroy(){
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }



}
