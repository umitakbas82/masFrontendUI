import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformansComponent } from './performans.component';

describe('PerformansComponent', () => {
  let component: PerformansComponent;
  let fixture: ComponentFixture<PerformansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
