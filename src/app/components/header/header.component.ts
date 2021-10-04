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

import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ApplicationURL} from '../../utilities/application-url';
import {AppConfigurationsService} from '../../services/app-configurations/app-configurations.service';
import {CurrentUser} from '../../utilities/user/current-user/current-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public constructor(public readonly currentUser: CurrentUser,
                     private readonly router: Router,
                     private readonly config: AppConfigurationsService) {
  }

  public logout(): void {
    this.currentUser.logOut();
    this.router.navigateByUrl(ApplicationURL.Login);
  }

  public getLogoUrl(): string | undefined {
    return this.config.logoUrl;
  }

  public getCompanyName(): string | undefined {
    return this.config.companyName;
  }

  public navigateToDashboard(): void {
    this.router.navigateByUrl(ApplicationURL.Dashboard);
  }

  public navigateToIssuedCredentials(): void {
    this.router.navigateByUrl(ApplicationURL.ManageIssuedCredentials);
  }
}
