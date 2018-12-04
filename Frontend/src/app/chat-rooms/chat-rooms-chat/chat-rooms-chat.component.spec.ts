import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRoomsChatComponent } from './chat-rooms-chat.component';

describe('ChatRoomsChatComponent', () => {
  let component: ChatRoomsChatComponent;
  let fixture: ComponentFixture<ChatRoomsChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatRoomsChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRoomsChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
