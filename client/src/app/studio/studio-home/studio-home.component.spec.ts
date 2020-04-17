import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioHomeComponent } from './studio-home.component';

describe('StudioHomeComponent', () => {
  let component: StudioHomeComponent;
  let fixture: ComponentFixture<StudioHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudioHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
