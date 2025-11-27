import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhesPetPage } from './detalhes-pet.page';

describe('DetalhesPetPage', () => {
  let component: DetalhesPetPage;
  let fixture: ComponentFixture<DetalhesPetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesPetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
