import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerDetailComponent } from './farmer-detail.component';

describe('FarmerDetailComponent', () => {
  let component: FarmerDetailComponent;
  let fixture: ComponentFixture<FarmerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
