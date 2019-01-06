import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileViewImageComponent } from './profile-view-image.component';

describe('ProfileViewImageComponent', () => {
  let component: ProfileViewImageComponent;
  let fixture: ComponentFixture<ProfileViewImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileViewImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileViewImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
