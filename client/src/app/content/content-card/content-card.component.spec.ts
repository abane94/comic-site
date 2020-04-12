import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCardComponent } from './book-card/book-card.component';
import { MatCardModule } from '@angular/material';

import { ContentCardComponent } from './content-card.component';

describe('ContentCardComponent', () => {
  let component: ContentCardComponent;
  let fixture: ComponentFixture<ContentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports :[
        MatCardModule
      ],
      declarations: [
        BookCardComponent,
        ContentCardComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
