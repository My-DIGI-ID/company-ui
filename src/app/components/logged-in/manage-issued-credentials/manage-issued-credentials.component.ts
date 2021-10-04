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

import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {TableHeaderItem, ModalService, ModalButtonType} from 'carbon-components-angular';
import {IssuedCredentialDTO} from 'src/api-client';
import {IssuedCredentialsService} from 'src/app/services/issued-credentials/issued-credentials.service';
import {WarningModalComponent} from '../warning-modal/warning-modal.component';
import {TranslateService} from '@ngx-translate/core';
import {NotificationService} from 'src/app/services/notification/notification.service';
import {TableEntry} from '../../../utilities/table/TableEntry';

@Component({
  selector: 'app-manage-issued-credentials',
  templateUrl: './manage-issued-credentials.component.html',
  styleUrls: ['./manage-issued-credentials.component.scss']
})
export class ManageIssuedCredentialsComponent implements OnInit {
  public loading: boolean = true;
  public issuedCredentials?: IssuedCredentialDTO[];
  public tableData: TableEntry[][] = [];
  public tableHeader: TableHeaderItem[] = [];
  public overflowMenuItems: {button: string, callback: any}[] = [
    {
      button: this.translate.instant('manage-issued-credentials-component.warning-modal.revoke.title'),
      callback: this.openWarningModalToRevoke()
    }
  ];

  public constructor(private readonly issuedCredentialsService: IssuedCredentialsService,
                     private readonly datePipe: DatePipe,
                     private readonly modalService: ModalService,
                     private readonly translate: TranslateService,
                     private readonly notification: NotificationService) {
  }

  public async ngOnInit(): Promise<any> {
    this.createTable();
    this.updateTable();

    this.loading = false;
  }

  public openWarningModalToRevoke(): (data: {credentialId: string}) => void {
    return (data: {credentialId: string}) => {
      const modalRef = this.modalService.create(
        {
          component: WarningModalComponent,
          inputs: {
            title: this.translate.instant('manage-issued-credentials-component.warning-modal.revoke.title'),
            modalText: this.translate.instant('manage-issued-credentials-component.warning-modal.revoke.modal-text'),
            cancelButton: {text: this.translate.instant('manage-issued-credentials-component.warning-modal.revoke.button.cancel'), type: ModalButtonType.secondary},
            submitButton: {text: this.translate.instant('manage-issued-credentials-component.warning-modal.revoke.button.confirm'), type: ModalButtonType.danger}
          }
        });

      modalRef.onDestroy(() => {
        if (modalRef.instance.returnValue) {
          this.revokeIssuedCredentialById(data.credentialId);
        }
      });
    };
  }

  private createTable(): void {
    this.tableHeader = [
      new TableHeaderItem({data: this.translate.instant('manage-issued-credentials-component.table.id')}),
      new TableHeaderItem({data: this.translate.instant('manage-issued-credentials-component.table.issue-date')}),
      new TableHeaderItem()
    ];
  }

  private async getAllIssuedCredentials(): Promise<void> {
    try {
      this.issuedCredentials = await this.issuedCredentialsService.getAllIssuedCredentials();
    } catch (httpErrorResponse) {
      this.notification.showError();
    }
  }

  private fillTable(): void {
    const data: TableEntry[][] = [];

    this.issuedCredentials?.forEach((issuedCredential) => {
      if (issuedCredential.id && issuedCredential.issuanceDate) {
        data.push([
          new TableEntry({data: issuedCredential.id}),
          new TableEntry({
            data: this.datePipe.transform(issuedCredential.issuanceDate, 'shortDate'),
            sortValue: new Date(issuedCredential.issuanceDate)}
          ),
          new TableEntry({data: {credentialId: issuedCredential.id}, template: null})
        ]);
      }
    });

    this.tableData = data;
  }

  private async revokeIssuedCredentialById(id: any): Promise<void> {
    try {
      await this.issuedCredentialsService.revokeIssuedCredentialById(id);

      this.updateTable();
    } catch (httpErrorResponse) {
      this.notification.showError();
    }
  }

  private async updateTable(): Promise<void> {
    await this.getAllIssuedCredentials();

    this.fillTable();
  }
}
