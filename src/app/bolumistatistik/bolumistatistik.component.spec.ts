import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolumistatistikComponent } from './bolumistatistik.component';

describe('BolumistatistikComponent', () => {
  let component: BolumistatistikComponent;
  let fixture: ComponentFixture<BolumistatistikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BolumistatistikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BolumistatistikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
