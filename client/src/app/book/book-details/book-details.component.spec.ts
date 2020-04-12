import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../shared/services/content.service';

import { BookDetailsComponent } from './book-details.component';
import { Book } from '../../../../models/book';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let getBookSpy;
  let singleBook = new Book({
    id: 123,
    thumb_lg: 'some/path',
    desc_sh: 'a test book',
    desc_lg: 'test book long description',
    series_name: 'Test Series',
    series_id: 1,
    creator_id: 1,
    creator_name: 'Vincent Adultman',
    pages: [{id:1, src:'page/path/1'}],
    iss_num: 1,
  });
  let cont: ContentService;

  const route = ({ paramMap: of({
    id: 123,
    get: function(str) {
      return this[str] || `I dont have ${str}`
    }
  }) });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      declarations: [ BookDetailsComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: route }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDetailsComponent);
    var debugElement = fixture.debugElement;

    cont = debugElement.injector.get(ContentService);
    getBookSpy = spyOn(cont, 'getBook').and.returnValue(of(singleBook));
    getBookSpy.calls.reset();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the id in the url to call for a book', () => {
    component.ngOnInit();
    expect(getBookSpy).toHaveBeenCalledWith(123);
  });
});
