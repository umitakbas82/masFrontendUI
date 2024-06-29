import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BildirimtakvimiComponent } from './bildirimtakvimi.component';

describe('BildirimtakvimiComponent', () => {
  let component: BildirimtakvimiComponent;
  let fixture: ComponentFixture<BildirimtakvimiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BildirimtakvimiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BildirimtakvimiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
