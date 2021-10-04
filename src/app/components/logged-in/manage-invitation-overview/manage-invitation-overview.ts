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

import {Component, OnInit} from '@angular/core';
import {ModalService, TableHeaderItem, ModalButtonType} from 'carbon-components-angular';
import {Router} from '@angular/router';
import {EmployeeService} from 'src/app/services/employee/employee.service';
import {EmployeeDTO} from 'src/api-client';
import {WarningModalComponent} from '../warning-modal/warning-modal.component';
import {ApplicationURL} from '../../../utilities/application-url';
import {TranslateService} from '@ngx-translate/core';
import {NotificationService} from 'src/app/services/notification/notification.service';
import {TableEntry} from '../../../utilities/table/TableEntry';
import {EmailInvitationFile} from '../../../utilities/email-invitation-file';

@Component({
  selector: 'app-manage-invitation-overview',
  templateUrl: './manage-invitation-overview.html',
  styleUrls: ['./manage-invitation-overview.scss']
})
export class ManageInvitationOverviewComponent implements OnInit {
  public loading: boolean = false;
  public employees: EmployeeDTO[] = [];
  public tableData: TableEntry[][] = [];
  public tableHeader: TableHeaderItem[] = [];
  public overflowMenuItems: {button: string, callback: any}[] = [
    {
      button: this.translate.instant('manage-invitation-overview-component.table-action-menu.download'),
      callback: this.downloadEmailInvitation()
    },
    {
      button: this.translate.instant('manage-invitation-overview-component.table-action-menu.delete'),
      callback: this.openWarningModalForDelete()
    }
  ];

  public constructor(private readonly modalService: ModalService,
                     private readonly router: Router,
                     private readonly employeeService: EmployeeService,
                     private readonly notification: NotificationService,
                     private readonly translate: TranslateService) {
  }

  public ngOnInit(): void {
    this.createTable();
    this.updateTable();
  }

  public openWarningModalForDelete(): (employee: EmployeeDTO) => void {
    return (employee: EmployeeDTO) => {
      const modalRef = this.modalService.create(
        {
          component: WarningModalComponent,
          inputs: {
            title: this.translate.instant('manage-invitation-overview-component.warning-modal.title'),
            modalText: this.translate.instant('manage-invitation-overview-component.warning-modal.modal-text'),
            cancelButton: {text: this.translate.instant('manage-invitation-overview-component.warning-modal.button.cancel'), type: ModalButtonType.secondary},
            submitButton: {text: this.translate.instant('manage-invitation-overview-component.warning-modal.button.confirm'), type: ModalButtonType.danger}
          }
        });

      modalRef.onDestroy(() => {
        if (modalRef.instance.returnValue) {
          this.deleteEmployeeById(employee.employeeId);
        }
      });
    };
  }

  public downloadEmailInvitation(): (employee: EmployeeDTO) => Promise<void> {
    return async (employee: EmployeeDTO) => {
      try {
        const employeeId = employee.employeeId;
        const blobData = await this.employeeService.createEmailInvitation(employeeId);

        this.downloadEMLFile(employeeId, blobData);
      } catch (httpErrorResponse) {
        this.notification.showError();
      }
    };
  }

  public goToAddCredentialForm(): void {
    this.router.navigateByUrl(ApplicationURL.AddCredential);
  }

  public async deleteEmployeeById(employeeId: string): Promise<void> {
    try {
      await this.employeeService.deleteEmployee(employeeId);
      this.updateTable();
    } catch (httpErrorResponse) {
      this.notification.showError();
    }
  }

  private async updateTable(): Promise<void> {
    await this.getEmployees();
    this.fillTable();
  }

  private downloadEMLFile(employeeId: string, blobData: Blob): void {
    const emailInvitation = new EmailInvitationFile(blobData, employeeId);

    if (emailInvitation.isNotEmpty()) {
      emailInvitation.download();
    } else {
      this.notification.showError();
    }
  }

  private createTable(): void {
    this.tableHeader = [
      new TableHeaderItem({data: this.translate.instant('manage-invitation-overview-component.table.first-name')}),
      new TableHeaderItem({data: this.translate.instant('manage-invitation-overview-component.table.last-name')}),
      new TableHeaderItem({data: this.translate.instant('manage-invitation-overview-component.table.email')}),
      new TableHeaderItem({data: this.translate.instant('manage-invitation-overview-component.table.id')}),
      new TableHeaderItem()
    ];
  }

  private async getEmployees(): Promise<void> {
    try {
      this.employees = await this.employeeService.getAllEmployees();
    } catch (httpErrorResponse) {
      this.notification.showError();
    }
  }

  private fillTable(): void {
    const data: TableEntry[][] = [];

    this.employees?.forEach((employee) => {
      data.push([
        new TableEntry({data: employee.firstName}),
        new TableEntry({data: employee.lastName}),
        new TableEntry({data: employee.email ? employee.email : '-'}),
        new TableEntry({data: employee.employeeId}),
        new TableEntry({data: employee, template: null})
      ]);
    });

    this.tableData = data;
  }
}
