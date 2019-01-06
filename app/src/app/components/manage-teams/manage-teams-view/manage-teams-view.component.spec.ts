import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTeamsViewComponent } from './manage-teams-view.component';

describe('ManageTeamsViewComponent', () => {
  let component: ManageTeamsViewComponent;
  let fixture: ComponentFixture<ManageTeamsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTeamsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTeamsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
