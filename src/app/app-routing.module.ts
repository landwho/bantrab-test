import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './empresa/empresa.component';
import { CrearNuevaComponent } from './empresa/crear-nueva/crear-nueva.component';
import { EditarEmpresaComponent } from './empresa/editar-empresa/editar-empresa.component';
import { ListarEmpresaComponent } from './empresa/listar-empresa/listar-empresa.component';
import { DetalleEmpresaComponent } from './empresa/detalle-empresa/detalle-empresa.component';

const routes: Routes = [
  {path:'', component:EmpresaComponent},
  {path:'nuevo', component:CrearNuevaComponent},
  {path:'editar/empresa/:id', component:EditarEmpresaComponent},
  {path:'listar', component:ListarEmpresaComponent},
  {path:'detalle/empresa/:id', component:DetalleEmpresaComponent},
  { path:'', redirectTo:'/', pathMatch: 'full'},
  { path: '**', redirectTo:  '/' }
];


const routerOptions: ExtraOptions = {
  useHash: true,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
