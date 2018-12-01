import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamViewImageComponent } from './team-view-image.component';

describe('TeamViewImageComponent', () => {
  let component: TeamViewImageComponent;
  let fixture: ComponentFixture<TeamViewImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamViewImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamViewImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
