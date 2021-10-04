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

import {Component, ViewChild} from '@angular/core';
import {CredentialFormComponent} from '../credential-form/credential-form.component';
import {FormValidator} from '../../../../utilities/form-validators/form-validator';
import {Router} from '@angular/router';
import {EmployeeService} from '../../../../services/employee/employee.service';
import {NotificationService} from '../../../../services/notification/notification.service';
import {ApplicationURL} from '../../../../utilities/application-url';
import {HttpErrorResponse} from '@angular/common/http';
import {EmployeeDTO} from '../../../../../api-client';
import {BadRequestError} from '../../../../models/BadRequestError';
import {ErrorTypeDeterminer} from '../../../../utilities/error-type-determiner/error-type-determiner';

enum BadRequestErrorMessages {
  EmployeeIdAlreadyExists = 'An employee with the given id already exists.',
  IdInvitationAlreadyAccepted = 'An invitation for the given credential id has already been accepted.'
}

@Component({
  selector: 'app-add-credential',
  templateUrl: './add-credential.component.html',
  styleUrls: ['./add-credential.component.scss']
})
export class AddCredentialComponent {
  @ViewChild(CredentialFormComponent)
  private readonly credentialForm?: CredentialFormComponent;

  public constructor(private readonly formValidator: FormValidator,
                     private readonly router: Router,
                     private readonly employeeService: EmployeeService,
                     private readonly notification: NotificationService) {
  }

  public async submitAddCredential(): Promise<void> {
    if (this.credentialForm?.valid()) {
      const employee = this.createEmployeeDTO();

      try {
        await this.employeeService.createEmployee(employee);

        this.router.navigateByUrl(ApplicationURL.ManageInvitations);
      } catch (httpErrorResponse: unknown) {
        if (httpErrorResponse instanceof HttpErrorResponse &&
          ErrorTypeDeterminer.IS_ERROR_TYPE_BAD_REQUEST(httpErrorResponse.error)) {
          this.handleBadRequestError(httpErrorResponse.error);
        } else {
          this.notification.showError();
        }
      }
    }
  }

  public discard(): void {
    this.router.navigateByUrl(ApplicationURL.ManageInvitations);
  }

  private createEmployeeDTO(): EmployeeDTO {
    const formValues = this.formValidator.getSanitizedRawFormValues(this.credentialForm!.credentialForm);

    return {
      employeeId: formValues.id,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      firmName: formValues.companyName,
      firmSubject: formValues.companySubject,
      firmStreet: formValues.companyAddress,
      firmPostalCode: formValues.companyZipCode,
      firmCity: formValues.companyCity
    };
  }

  private handleBadRequestError(badRequestError: BadRequestError): void {
    if (badRequestError.message.includes(BadRequestErrorMessages.EmployeeIdAlreadyExists)) {
      this.credentialForm?.credentialForm.get('id')!.setErrors({'not-unique': true});
    } else if (badRequestError.message.includes(BadRequestErrorMessages.IdInvitationAlreadyAccepted)) {
      this.credentialForm?.credentialForm.get('id')!.setErrors({'invitation-already-accepted': true});
    } else {
      this.notification.showError();
    }
  }
}
