import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntercultureComponent } from './interculture.component';

describe('IntercultureComponent', () => {
  let component: IntercultureComponent;
  let fixture: ComponentFixture<IntercultureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntercultureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntercultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
