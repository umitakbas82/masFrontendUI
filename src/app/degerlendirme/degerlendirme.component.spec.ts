import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegerlendirmeComponent } from './degerlendirme.component';

describe('DegerlendirmeComponent', () => {
  let component: DegerlendirmeComponent;
  let fixture: ComponentFixture<DegerlendirmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DegerlendirmeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegerlendirmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
