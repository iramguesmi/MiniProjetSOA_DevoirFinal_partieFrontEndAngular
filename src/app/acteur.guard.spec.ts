import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { acteurGuard } from './acteur.guard';

describe('acteurGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => acteurGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
