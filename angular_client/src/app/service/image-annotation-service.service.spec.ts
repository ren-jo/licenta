import { TestBed } from '@angular/core/testing';

import { ImageAnnotationServiceService } from './image-annotation-service.service';

describe('ImageAnnotationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageAnnotationServiceService = TestBed.get(ImageAnnotationServiceService);
    expect(service).toBeTruthy();
  });
});
