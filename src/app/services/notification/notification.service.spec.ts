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
import {NotificationService} from './notification.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {NotificationService as CarbonNotificationService} from 'carbon-components-angular';
import {ErrorNotification} from 'src/app/models/notifications/ErrorNotification';

describe('NotificationService', () => {
  let notificationService: NotificationService;
  let translateServie: TranslateService;
  let carbonNotificationService: CarbonNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService, CarbonNotificationService, TranslateService],
      imports: [TranslateModule.forRoot()]
    });

    notificationService = TestBed.inject(NotificationService);
    carbonNotificationService = TestBed.inject(CarbonNotificationService);
    translateServie = TestBed.inject(TranslateService);
  });

  it('should be created successfully', () => {
    expect(notificationService).toBeTruthy();
  });

  it('should create an error message containing the text provided by TranslateService', () => {
    const spy = spyOn(carbonNotificationService, 'showNotification');
    const notificationText = translateServie.instant('error-notification');
    notificationService.showError();

    expect(spy).toHaveBeenCalledWith(new ErrorNotification(notificationText));
  });

});
