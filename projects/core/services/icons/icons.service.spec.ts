import { TestBed } from '@angular/core/testing';

import { exceptionIcons, IconService } from './icon.service';

describe('IconService', () => {
  const addIcon: string = 'add';

  let service: IconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  exceptionIcons.forEach((icon: string) => {
    it(`#isPartOfExceptionsIcons should return true when '${icon}' is part of the exception icons`, () => {
      expect(service.isPartOfExceptionsIcons({ fontIcon: icon })).toBe(true);
    });
  });

  it(`#isPartOfExceptionsIcons should return false when the icon ('${addIcon}') is not part of the exception icons`, () => {
    expect(service.isPartOfExceptionsIcons({ fontIcon: addIcon })).toBe(false);
  });

  it('#hasActionAuthorized should return true when the icon param is correctly defined', () => {
    expect(service.hasActionAuthorized({
      fontIcon: addIcon,
      action: () => {
        // prevents no empty function
      },
    })).toBe(true);
  });

  it(`#hasActionAuthorized should return false when the icon param is not defined`, () => {
    expect(service.hasActionAuthorized({})).toBe(false);
  });
});
