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

import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NotificationService as CarbonNotificationService} from 'carbon-components-angular';
import {ErrorNotification} from 'src/app/models/notifications/ErrorNotification';

@Injectable({providedIn: 'root'})

export class NotificationService {
  private readonly notificationText: string = this.translate.instant('error-notification');
  private readonly errorNotification: ErrorNotification = new ErrorNotification(this.notificationText);

  public constructor (private readonly carbonNotificationService: CarbonNotificationService,
                      private readonly translate: TranslateService) {

  }

  public showError(): void {
    this.carbonNotificationService.showNotification(this.errorNotification);
  }
}
