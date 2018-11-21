import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRoomsListComponent } from './chat-rooms-list.component';

describe('ChatRoomsListComponent', () => {
  let component: ChatRoomsListComponent;
  let fixture: ComponentFixture<ChatRoomsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatRoomsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRoomsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
