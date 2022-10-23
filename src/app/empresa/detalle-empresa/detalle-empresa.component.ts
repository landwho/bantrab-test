import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EmpresaService } from '../empresa.service';
@Component({
  selector: 'app-detalle-empresa',
  templateUrl: './detalle-empresa.component.html',
  styleUrls: ['./detalle-empresa.component.css']
})
export class DetalleEmpresaComponent implements OnInit {

  constructor(private _api:EmpresaService, private  _activateRoute : ActivatedRoute) { }

  id:any;
  empresaId:number =0;
  empresa:any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  
  ngOnInit(): void {
    this._activateRoute.params.subscribe(params => {
      this.id = params
      this.empresaId = this.id.id
    })
    this.verEmpresa()
  }

  verEmpresa(){
    this._api.verEmpresa(this.empresaId).pipe(takeUntil(this._unsubscribeAll))
    .subscribe((data) => {
      this.empresa = data;
    }) 
  }

  ngOnDestroy(){
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
