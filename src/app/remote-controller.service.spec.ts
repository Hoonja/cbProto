import { TestBed, inject } from '@angular/core/testing';

import { RemoteControllerService } from './remote-controller.service';

describe('RemoteControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoteControllerService]
    });
  });

  it('should be created', inject([RemoteControllerService], (service: RemoteControllerService) => {
    expect(service).toBeTruthy();
  }));
});
