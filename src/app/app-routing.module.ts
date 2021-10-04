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

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AdminGuard} from './guards/admin.guard';
import {AuthGuard} from './guards/auth.guard';
import {ApplicationURL} from './utilities/application-url';
import {DashboardComponent} from './components/logged-in/dashboard/dashboard.component';
import {ManageIssuedCredentialsComponent} from './components/logged-in/manage-issued-credentials/manage-issued-credentials.component';
import {ManageInvitationOverviewComponent} from './components/logged-in/manage-invitation-overview/manage-invitation-overview';
import {LoggedOutGuard} from './guards/logged-out.guard';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AddCredentialComponent} from './components/logged-in/credential/add-credential/add-credential.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ApplicationURL.Login
  },
  {
    path: ApplicationURL.Login,
    component: LoginComponent,
    canActivate: [LoggedOutGuard]
  },
  {
    path: ApplicationURL.Dashboard,
    component: DashboardComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: ApplicationURL.AddCredential,
    component: AddCredentialComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: ApplicationURL.ManageIssuedCredentials,
    component: ManageIssuedCredentialsComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: ApplicationURL.ManageInvitations,
    component: ManageInvitationOverviewComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: ApplicationURL.PageNotFound,
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: ApplicationURL.PageNotFound
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
