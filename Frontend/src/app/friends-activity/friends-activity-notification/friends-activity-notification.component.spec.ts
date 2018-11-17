import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsActivityNotificationComponent } from './friends-activity-notification.component';

describe('FriendsActivityNotificationComponent', () => {
  let component: FriendsActivityNotificationComponent;
  let fixture: ComponentFixture<FriendsActivityNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsActivityNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsActivityNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
