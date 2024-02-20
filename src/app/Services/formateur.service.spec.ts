import { TestBed } from '@angular/core/testing';

import { formateurService } from './formateur.service';

describe('FormateurService', () => {
  let service: formateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(formateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
