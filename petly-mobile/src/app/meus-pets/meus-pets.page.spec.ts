import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeusPetsPage } from './meus-pets.page';

describe('MeusPetsPage', () => {
  let component: MeusPetsPage;
  let fixture: ComponentFixture<MeusPetsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusPetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
