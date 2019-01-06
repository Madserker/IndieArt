import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsActivityViewComponent } from './friends-activity-view.component';

describe('FriendsActivityViewComponent', () => {
  let component: FriendsActivityViewComponent;
  let fixture: ComponentFixture<FriendsActivityViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsActivityViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsActivityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
