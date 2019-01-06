import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationListComponent } from './animation-list.component';

describe('AnimationListComponent', () => {
  let component: AnimationListComponent;
  let fixture: ComponentFixture<AnimationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
