import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSideNavComponent } from './list-side-nav.component';

describe('ListSideNavComponent', () => {
  let component: ListSideNavComponent;
  let fixture: ComponentFixture<ListSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
