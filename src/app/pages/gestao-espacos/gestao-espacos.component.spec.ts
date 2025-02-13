import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoEspacosComponent } from './gestao-espacos.component';

describe('GestaoEspacosComponent', () => {
  let component: GestaoEspacosComponent;
  let fixture: ComponentFixture<GestaoEspacosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestaoEspacosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoEspacosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
