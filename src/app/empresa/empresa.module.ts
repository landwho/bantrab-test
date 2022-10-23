import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpresaComponent } from './empresa.component';
import { ListarEmpresaComponent } from './listar-empresa/listar-empresa.component';
import { EditarEmpresaComponent } from './editar-empresa/editar-empresa.component'
import { CrearNuevaComponent} from './crear-nueva/crear-nueva.component'
import {MatTableModule} from '@angular/material/table';
import { DetalleEmpresaComponent } from './detalle-empresa/detalle-empresa.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        SweetAlert2Module
    ],
    exports: [],
    declarations: [
        EmpresaComponent,
        CrearNuevaComponent,
        EditarEmpresaComponent,
        ListarEmpresaComponent,
        DetalleEmpresaComponent
        
    ]
})

export class EmpresaModule { }