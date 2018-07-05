import { TestBed, inject } from '@angular/core/testing';

import { MqttConnectorService } from './mqtt-connector.service';

describe('MqttConnectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MqttConnectorService]
    });
  });

  it('should be created', inject([MqttConnectorService], (service: MqttConnectorService) => {
    expect(service).toBeTruthy();
  }));
});
