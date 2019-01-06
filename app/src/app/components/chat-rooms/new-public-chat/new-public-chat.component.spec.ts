import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPublicChatComponent } from './new-public-chat.component';

describe('NewPublicChatComponent', () => {
  let component: NewPublicChatComponent;
  let fixture: ComponentFixture<NewPublicChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPublicChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPublicChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
