import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationViewComponent } from './animation-view.component';

describe('AnimationViewComponent', () => {
  let component: AnimationViewComponent;
  let fixture: ComponentFixture<AnimationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
