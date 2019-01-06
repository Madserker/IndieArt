import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterViewerComponent } from './chapter-viewer.component';

describe('ChapterViewerComponent', () => {
  let component: ChapterViewerComponent;
  let fixture: ComponentFixture<ChapterViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
