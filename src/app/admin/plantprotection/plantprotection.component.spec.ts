import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantprotectionComponent } from './plantprotection.component';

describe('PlantprotectionComponent', () => {
  let component: PlantprotectionComponent;
  let fixture: ComponentFixture<PlantprotectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantprotectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantprotectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
