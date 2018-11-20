import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamImageComponent } from './team-image.component';

describe('TeamImageComponent', () => {
  let component: TeamImageComponent;
  let fixture: ComponentFixture<TeamImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
