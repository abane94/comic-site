import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGridComponent } from './card-grid.component';
import { ContentService } from '../../shared/services/content.service';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';
import { Book } from '../../../../models/book';

import {
    MatButtonModule,
    MatCardModule,
  } from '@angular/material';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentCardComponent } from '../content-card/content-card.component';
import { BookCardComponent } from '../content-card/book-card/book-card.component';

describe('CardGridComponent', () => {
  let component: CardGridComponent;
  let fixture: ComponentFixture<CardGridComponent>;
  let cont: ContentService;
  let getBooksSpy;
  let books = [
    new Book({
      id: 111,
      thumb_lg: 'some/path',
      desc_sh: 'test book1',
      desc_lg: 'test book1 long description',
      series_name: 'Test Series1',
      series_id: 1,
      creator_id: 1,
      creator_name: 'Vincent Adultman',
      pages: [{id:1, src:'page/path/1'}],
      iss_num: 1,
    }),
    new Book({
      id: 222,
      thumb_lg: 'some//other/path',
      desc_sh: 'test book2',
      desc_lg: 'test book2 long description',
      series_name: 'Test Series2',
      series_id: 2,
      creator_id: 1,
      creator_name: 'Vincent Adultman',
      pages: [{id:1, src:'page/path/1'}],
      iss_num: 1,
    })
  ]
  const route = ({ paramMap: of({
    id: 333,
    query: 'some query',
    get: function(str) {
      return this[str] || `I dont have ${str}`
    }
  }) });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        MatButtonModule,
        MatCardModule
      ],
      declarations: [
        CardGridComponent,
        ContentCardComponent,
        BookCardComponent
       ],
      providers: [
        { provide: ActivatedRoute, useValue: route }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardGridComponent);
    var debugElement = fixture.debugElement;

    cont = debugElement.injector.get(ContentService);
    getBooksSpy = spyOn(cont, 'getBooks').and.returnValue(of(books));
    getBooksSpy.calls.reset();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should accept an object as input', () => {
    var obj = {
      cards: [new Book({}), new Book({})],
      query: 'query from object'
    };
    component.grid_data = obj
    fixture.detectChanges();
    expect(component.grid_data).toBe(obj);
  });

  it('should accept a search query string as input', () => {
    component.grid_data = 'some query';
    fixture.detectChanges();
    expect(component.grid_query).toBe('some query');
  });

  it('should use the query input to retrieve books', () => {
    component.grid_data = 'some query';
    fixture.detectChanges();
    expect(getBooksSpy).toHaveBeenCalledWith('some query');
    expect(getBooksSpy).toHaveBeenCalledTimes(1);
  });

  it("should use the 'query' query param if no input is supplied", () => {
    expect(getBooksSpy).toHaveBeenCalledWith('some query');
    expect(component.grid_query).toBe('some query');
    expect(component.grid_data).toEqual({ cards: books, query: 'some query' });
  });
});
