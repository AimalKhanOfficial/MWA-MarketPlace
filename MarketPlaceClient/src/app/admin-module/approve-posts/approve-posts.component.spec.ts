import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePostsComponent } from './approve-posts.component';

describe('ApprovePostsComponent', () => {
  let component: ApprovePostsComponent;
  let fixture: ComponentFixture<ApprovePostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
