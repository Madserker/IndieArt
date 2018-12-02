import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTeamsItemComponent } from './manage-teams-item.component';

describe('ManageTeamsItemComponent', () => {
  let component: ManageTeamsItemComponent;
  let fixture: ComponentFixture<ManageTeamsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTeamsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTeamsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
