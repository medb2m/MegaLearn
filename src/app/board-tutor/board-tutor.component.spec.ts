import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTutorComponent } from './board-tutor.component';

describe('BoardTutorComponent', () => {
  let component: BoardTutorComponent;
  let fixture: ComponentFixture<BoardTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardTutorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
