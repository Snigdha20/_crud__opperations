import { TestBed } from '@angular/core/testing';

import { FileService } from './imageupload.service';

describe('ImageuploadService', () => {
  let service: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
