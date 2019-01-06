import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptersViewComponent } from './chapters-view.component';

describe('ChaptersViewComponent', () => {
  let component: ChaptersViewComponent;
  let fixture: ComponentFixture<ChaptersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaptersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaptersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
