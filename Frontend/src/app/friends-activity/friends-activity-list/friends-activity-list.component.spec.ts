import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsActivityListComponent } from './friends-activity-list.component';

describe('FriendsActivityListComponent', () => {
  let component: FriendsActivityListComponent;
  let fixture: ComponentFixture<FriendsActivityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
