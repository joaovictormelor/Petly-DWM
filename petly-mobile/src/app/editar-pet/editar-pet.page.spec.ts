import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPetPage } from './editar-pet.page';

describe('EditarPetPage', () => {
  let component: EditarPetPage;
  let fixture: ComponentFixture<EditarPetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
