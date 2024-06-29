import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BildirimonayiComponent } from './bildirimonayi.component';

describe('BildirimonayiComponent', () => {
  let component: BildirimonayiComponent;
  let fixture: ComponentFixture<BildirimonayiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BildirimonayiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BildirimonayiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
