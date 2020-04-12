import { TestBed, inject } from '@angular/core/testing';
import { SharedModule } from '../shared.module';

import { ContentService } from './content.service';

describe('ContentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      providers: [ContentService]
    });
  });

  it('should be created', inject([ContentService], (service: ContentService) => {
    expect(service).toBeTruthy();
  }));
});
