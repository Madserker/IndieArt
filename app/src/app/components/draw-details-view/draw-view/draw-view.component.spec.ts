import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawViewComponent } from './draw-view.component';

describe('DrawViewComponent', () => {
  let component: DrawViewComponent;
  let fixture: ComponentFixture<DrawViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
