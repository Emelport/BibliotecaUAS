import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RduComponent } from './rdu.component';

describe('RduComponent', () => {
  let component: RduComponent;
  let fixture: ComponentFixture<RduComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RduComponent]
    });
    fixture = TestBed.createComponent(RduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
