import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsViewComponent } from './lists-view.component';

describe('ListsViewComponent', () => {
  let component: ListsViewComponent;
  let fixture: ComponentFixture<ListsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
