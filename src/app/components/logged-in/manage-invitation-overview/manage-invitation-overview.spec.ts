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
import {ManageInvitationOverviewComponent } from './manage-invitation-overview';
import {ModalService, PlaceholderModule} from 'carbon-components-angular';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EmployeeService} from 'src/app/services/employee/employee.service';
import {Router} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {NotificationService} from 'src/app/services/notification/notification.service';

describe('ManageInvitationOverviewComponent', () => {
  let component: ManageInvitationOverviewComponent;
  let fixture: ComponentFixture<ManageInvitationOverviewComponent>;
  let employeeService: EmployeeService;
  let router: Router;

  beforeEach(async () => {
    const modalServiceMock = jasmine.createSpyObj('ModalService', ['create', 'destroy']);
    const employeeServiceMock = jasmine.createSpyObj(
      'EmployeeService',
      [
        'createEmailInvitation',
        'getAllEmployees',
        'deleteEmployee',
        'updateEmployee'
      ]
    );
    const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const notificationServiceMock = jasmine.createSpyObj('NotificationService', ['showError']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        PlaceholderModule,
        TranslateModule.forRoot()
      ],
      declarations: [ManageInvitationOverviewComponent],
      providers: [
        {
          provide: ModalService,
          useValue: modalServiceMock
        },
        {
          provide: EmployeeService,
          useValue: employeeServiceMock
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: NotificationService,
          useValue: notificationServiceMock
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageInvitationOverviewComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('instance should be successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('if I click the "Download E-Mail", the email invitation should download', async () => {
    const downloadFunction = component.downloadEmailInvitation();
    await downloadFunction({
      employeeId: 'employeeId-123',
      email: '',
      firmCity: '',
      firmName: '',
      firmPostalCode: '',
      firmStreet: '',
      firstName: '',
      lastName: ''
    });

    expect(employeeService.createEmailInvitation).toHaveBeenCalledTimes(1);
  });

  it('if I delete an employee, the employee will be delete from the table', async () => {
    await component.deleteEmployeeById('employeeId-123');

    expect(employeeService.deleteEmployee).toHaveBeenCalledTimes(1);
  });

  it('if I load the page, page should show employees data', () => {
    component.ngOnInit();

    expect(employeeService.getAllEmployees).toHaveBeenCalled();
  });

  it('if I click the Invite employee button, I should be on Add credential invitation form', () => {
    component.goToAddCredentialForm();

    expect(router.navigateByUrl).toHaveBeenCalledOnceWith('add-credential');
  });
});
