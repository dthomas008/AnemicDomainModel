import { TestBed, inject } from '@angular/core/testing';

import { WipService } from './wip.service';

describe('WipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WipService]
    });
  });

  it('should be created', inject([WipService], (service: WipService) => {
    expect(service).toBeTruthy();
  }));

  it('should store a wip and retrieve it', inject([WipService], (service: WipService) => {
    console.log('should store a wip and retrieve it');
    const testData = {
      firstName: 'Fred',
      lastName: 'Stone'
    };
    const key1 = service.storeWipEntity(testData,  null,  'names', 'someones name', 'home');
    const testDataReturn = service.loadWipEntity(key1);
    expect(testDataReturn.firstName).toBe(testData.firstName);
    expect(testDataReturn.lastName).toBe(testData.lastName);
  }));

  it('should store a wip and remove it', inject([WipService], (service: WipService) => {
    const testData = {
      firstName: 'Wilma',
      lastName: 'Stone'
    };
    const key1 = service.storeWipEntity(testData, null, 'names', 'someones name', 'home');
    service.removeWipEntity(key1);
    const testDataReturn = service.loadWipEntity(key1);
    expect(testDataReturn).toBeFalsy();

  }));
  it('should remove all wip', inject([WipService], (service: WipService) => {
    const testData = {
      firstName: 'Wilma',
      lastName: 'Stone'
    };
    const key1 = service.storeWipEntity(testData, null, 'names', 'someones name', 'home');
    service.clearAllWip();
    const testDataReturn = service.loadWipEntity(key1);
    expect(testDataReturn).toBeFalsy();

  }));



});
