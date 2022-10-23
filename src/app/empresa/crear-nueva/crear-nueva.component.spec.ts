import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNuevaComponent } from './crear-nueva.component';

describe('CrearNuevaComponent', () => {
  let component: CrearNuevaComponent;
  let fixture: ComponentFixture<CrearNuevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearNuevaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
