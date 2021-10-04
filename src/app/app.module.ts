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

import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {AppConfigurationsService} from './services/app-configurations/app-configurations.service';
import {
  GridModule,
  TableModule,
  PlaceholderModule,
  DropdownModule,
  ModalModule,
  DialogModule,
  NotificationModule,
  ModalService, TilesModule, InlineLoadingModule, LinkModule, PaginationModule
} from 'carbon-components-angular';
import {ButtonModule} from 'carbon-components-angular/button';
import {QRCodeModule} from 'angularx-qrcode';
import {CarbonIconsModule} from './modules/carbon-icons.module';
import {ApiModule, Configuration} from '../api-client';
import {Token} from './utilities/token/token';
import {UnauthorizedInterceptor} from './utilities/http-interceptors/unauthorized-interceptor.service';
import {FormValidator} from './utilities/form-validators/form-validator';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './components/login/login.component';
import {HeaderComponent} from './components/header/header.component';
import {DashboardComponent} from './components/logged-in/dashboard/dashboard.component';
import {ManageIssuedCredentialsComponent} from './components/logged-in/manage-issued-credentials/manage-issued-credentials.component';
import {ManageInvitationOverviewComponent} from './components/logged-in/manage-invitation-overview/manage-invitation-overview';
import {WarningModalComponent} from './components/logged-in/warning-modal/warning-modal.component';
import {DatePipe} from '@angular/common';
import {ContactModalComponent} from './components/login/contact-modal/contact-modal.component';
import {FooterComponent} from './components/footer/footer.component';
import {FeedbackModalComponent} from './components/logged-in/feedback-modal/feedback-modal.component';
import {AutofocusDirective} from './utilities/directives/autofocus.directive';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {TableComponent} from './components/logged-in/table/table.component';
import {TranslateModule, TranslateLoader, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslationLoaderService} from './services/translation-loader/translation-loader.service';
import {AddCredentialComponent} from './components/logged-in/credential/add-credential/add-credential.component';
import {CredentialFormComponent} from './components/logged-in/credential/credential-form/credential-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCredentialComponent,
    CredentialFormComponent,
    DashboardComponent,
    ManageInvitationOverviewComponent,
    LoginComponent,
    HeaderComponent,
    ManageIssuedCredentialsComponent,
    WarningModalComponent,
    ContactModalComponent,
    FooterComponent,
    FeedbackModalComponent,
    AutofocusDirective,
    PageNotFoundComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    ButtonModule,
    HttpClientModule,
    QRCodeModule,
    CarbonIconsModule,
    NotificationModule,
    TableModule,
    DropdownModule,
    ModalModule,
    DialogModule,
    ApiModule,
    PlaceholderModule,
    ModalModule,
    TilesModule,
    InlineLoadingModule,
    LinkModule,
    PaginationModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient): TranslateHttpLoader => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [AppConfigurationsService],
      useFactory: (appConfigurationsService: AppConfigurationsService) => async () => appConfigurationsService.loadConfigurations(),
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      deps: [TranslateService, Injector],
      useFactory: (translationLoaderService: TranslationLoaderService) => () => translationLoaderService.translationLoaderFactory,
      multi: true
    },
    {
      provide: Configuration,
      useFactory: (token: Token, appConfigurationsService: AppConfigurationsService) => new Configuration(
        {
          basePath: appConfigurationsService.controllerAPIUrl,
          accessToken: token.get.bind(token)
        }
      ),
      deps: [Token, AppConfigurationsService],
      multi: false
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    FormValidator,
    AuthGuard,
    ModalService,
    DatePipe,
    TranslatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
