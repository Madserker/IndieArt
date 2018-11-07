import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawDetailsComponent } from './draw-details.component';

describe('DrawDetailsComponent', () => {
  let component: DrawDetailsComponent;
  let fixture: ComponentFixture<DrawDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
