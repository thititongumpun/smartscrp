import { TestBed } from '@angular/core/testing';

import { SmartScriptService } from './smart-script.service';

describe('SmartScriptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmartScriptService = TestBed.get(SmartScriptService);
    expect(service).toBeTruthy();
  });
});
