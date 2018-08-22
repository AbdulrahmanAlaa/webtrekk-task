import { TestBed, async, inject } from '@angular/core/testing';

import { AuthenticatedGuard } from './authenticated.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageService } from '../services/storage.service';

describe('AuthenticatedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [AuthenticatedGuard, StorageService]
    });
  });

  it('should ...', inject([AuthenticatedGuard], (guard: AuthenticatedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
