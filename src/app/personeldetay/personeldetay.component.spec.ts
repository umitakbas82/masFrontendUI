import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoneldetayComponent } from './personeldetay.component';

describe('PersoneldetayComponent', () => {
  let component: PersoneldetayComponent;
  let fixture: ComponentFixture<PersoneldetayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersoneldetayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersoneldetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
