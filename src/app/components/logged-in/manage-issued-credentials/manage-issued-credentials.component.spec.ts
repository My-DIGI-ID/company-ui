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

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ManageIssuedCredentialsComponent} from './manage-issued-credentials.component';
import {GridModule, TableModule, DialogModule, NFormsModule, ModalService} from 'carbon-components-angular';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {OverflowMenuVerticalModule} from '@carbon/icons-angular';
import {FormsModule} from '@angular/forms';
import {IssuedCredentialsService} from 'src/app/services/issued-credentials/issued-credentials.service';
import {DatePipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {NotificationService} from '../../../services/notification/notification.service';

@Pipe({name: 'MockPipe'})
class MockPipe implements PipeTransform {
  public transform(value: string | null, format: string): string {
    return '11-03-2021';
  }
}

describe('ManageIssuedCredentialsComponent', () => {
  let component: ManageIssuedCredentialsComponent;
  let fixture: ComponentFixture<ManageIssuedCredentialsComponent>;
  let issuedCredentialsService: IssuedCredentialsService;

  beforeEach(async () => {
    const notificationServiceMock = jasmine.createSpyObj('NotificationService', ['showError']);
    const issuedCredentialsServiceMock = jasmine.createSpyObj('IssuedCredentialsService', ['getAllIssuedCredentials', 'revokeIssuedCredentialById']);
    issuedCredentialsServiceMock.getAllIssuedCredentials.and.callFake(() => {
      return [
        {
          id: '444',
          issuanceDate: '2021-03-11T17:06:28.967Z'
        }
      ];
    });

    await TestBed.configureTestingModule({
      declarations: [ManageIssuedCredentialsComponent],
      imports: [
        TableModule,
        GridModule,
        OverflowMenuVerticalModule,
        RouterTestingModule,
        HttpClientTestingModule,
        DialogModule,
        NFormsModule,
        FormsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: IssuedCredentialsService,
          useValue: issuedCredentialsServiceMock
        },
        {
          provide: DatePipe,
          use: MockPipe
        },
        {
          provide: NotificationService,
          useValue: notificationServiceMock
        },
        ModalService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIssuedCredentialsComponent);
    component = fixture.componentInstance;
    issuedCredentialsService = TestBed.inject(IssuedCredentialsService);
    fixture.detectChanges();
  });

  it('instance should be created successfully', () => {
    expect(component).toBeTruthy();
  });
});
