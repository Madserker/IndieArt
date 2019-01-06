import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodesViewComponent } from './episodes-view.component';

describe('EpisodesViewComponent', () => {
  let component: EpisodesViewComponent;
  let fixture: ComponentFixture<EpisodesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
