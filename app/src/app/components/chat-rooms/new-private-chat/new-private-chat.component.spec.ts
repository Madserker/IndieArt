import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPrivateChatComponent } from './new-private-chat.component';

describe('NewPrivateChatComponent', () => {
  let component: NewPrivateChatComponent;
  let fixture: ComponentFixture<NewPrivateChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPrivateChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPrivateChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
