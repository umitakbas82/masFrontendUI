import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjedetayComponent } from './projedetay.component';

describe('ProjedetayComponent', () => {
  let component: ProjedetayComponent;
  let fixture: ComponentFixture<ProjedetayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjedetayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjedetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
