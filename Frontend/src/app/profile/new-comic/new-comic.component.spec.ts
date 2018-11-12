import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComicComponent } from './new-comic.component';

describe('NewComicComponent', () => {
  let component: NewComicComponent;
  let fixture: ComponentFixture<NewComicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewComicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
