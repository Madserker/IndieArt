import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSideNavComponent } from './login-side-nav.component';

describe('LoginSideNavComponent', () => {
  let component: LoginSideNavComponent;
  let fixture: ComponentFixture<LoginSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
