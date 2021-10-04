/*
 * Copyright 2021 Bundesrepublik Deutschland
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {TestBed} from '@angular/core/testing';
import {AppConfigurationsService} from './app-configurations.service';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {AppConfigurations} from '../../config/app-configurations';

describe('AppConfigurationsService', () => {
  let appConfigurationsService: AppConfigurationsService;
  let httpTestingController: HttpTestingController;
  let appConfigurations: AppConfigurations;
  let loadConfigurations: Promise<void>;
  let req: TestRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppConfigurationsService],
      imports: [HttpClientTestingModule]
    });

    appConfigurationsService = TestBed.inject(AppConfigurationsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(appConfigurationsService).toBeTruthy();
  });

  it ('should send a GET request to configurations.json', () => {
    loadConfigurations = appConfigurationsService.loadConfigurations();
    req = httpTestingController.expectOne('configurations.json');

    expect(req.request.method).toEqual('GET');
  });

  describe('should set all config fields to values returned by the http GET request', async () => {
    beforeEach(async () => {
      appConfigurations = {
        SSIBK_COMPANY_UI_LOGO_URL: 'logourl',
        SSIBK_COMPANY_UI_CONTROLLER_APIURL: 'api-url',
        SSIBK_COMPANY_UI_TITLE: 'title',
        SSIBK_COMPANY_UI_COMPANY_NAME: 'company-name',
        SSIBK_COMPANY_UI_VERSION: 'version'
      };

      loadConfigurations = appConfigurationsService.loadConfigurations();
      req = httpTestingController.expectOne('configurations.json');
      req.flush(appConfigurations);

      await loadConfigurations;
    });

    it('should set logourl to the value returned by the http GET request', () => {
      expect(appConfigurationsService.logoUrl).toEqual(appConfigurations.SSIBK_COMPANY_UI_LOGO_URL);
    });

    it('should set api-url to the value returned by the http GET request', () => {
      expect(appConfigurationsService.controllerAPIUrl).toEqual(appConfigurations.SSIBK_COMPANY_UI_CONTROLLER_APIURL);
    });

    it('should set title to the value returned by the http GET request', () => {
      expect(appConfigurationsService.title).toEqual(appConfigurations.SSIBK_COMPANY_UI_TITLE);
    });

    it('should set company-name to the value returned by the http GET request', () => {
      expect(appConfigurationsService.companyName).toEqual(appConfigurations.SSIBK_COMPANY_UI_COMPANY_NAME);
    });

    it('should set version to the value returned by the http GET request', () => {
      expect(appConfigurationsService.version).toEqual(appConfigurations.SSIBK_COMPANY_UI_VERSION);
    });
  });
});
