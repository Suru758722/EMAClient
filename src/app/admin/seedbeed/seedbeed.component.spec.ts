import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedbeedComponent } from './seedbeed.component';

describe('SeedbeedComponent', () => {
  let component: SeedbeedComponent;
  let fixture: ComponentFixture<SeedbeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedbeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedbeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
