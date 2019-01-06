import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatViewerComponent } from './chat-viewer.component';

describe('ChatViewerComponent', () => {
  let component: ChatViewerComponent;
  let fixture: ComponentFixture<ChatViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
