import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawListComponent } from './draw-list.component';

describe('DrawListComponent', () => {
  let component: DrawListComponent;
  let fixture: ComponentFixture<DrawListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
