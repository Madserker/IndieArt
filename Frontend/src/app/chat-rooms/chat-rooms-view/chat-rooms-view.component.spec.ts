import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRoomsViewComponent } from './chat-rooms-view.component';

describe('ChatRoomsViewComponent', () => {
  let component: ChatRoomsViewComponent;
  let fixture: ComponentFixture<ChatRoomsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatRoomsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRoomsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
