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

import {Component, Output, EventEmitter} from '@angular/core';
import {FormValidator} from 'src/app/utilities/form-validators/form-validator';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-credential-form',
  templateUrl: './credential-form.component.html',
  styleUrls: ['./credential-form.component.scss']
})
export class CredentialFormComponent {
  public credentialForm: FormGroup;

  @Output()
  private readonly submitForm: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  private readonly discardForm: EventEmitter<void> = new EventEmitter<void>();

  public constructor(public readonly formValidator: FormValidator,
                     private readonly formBuilder: FormBuilder) {
    this.credentialForm = this.createAddCredentialForm();
  }

  public submit(): void {
    this.submitForm.emit();
  }

  public discard(): void {
    this.credentialForm.reset();

    this.discardForm.emit();
  }

  public disableEmployeeIdField(): void {
    this.credentialForm.get('id')!.disable();
  }

  public setEmployeeID(employeeId: string): void {
    this.credentialForm.get('id')!.setValue(employeeId);
  }

  public valid(): boolean {
    return this.credentialForm.valid;
  }

  private createAddCredentialForm(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        this.formValidator.forbiddenCharactersId()
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        this.formValidator.requiredNoWhitespaceFill(),
        this.formValidator.forbiddenCharactersString()
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        this.formValidator.requiredNoWhitespaceFill(),
        this.formValidator.forbiddenCharactersString()
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        this.formValidator.isEmailOfValidLength(),
        this.formValidator.requiredNoWhitespaceFill()
      ]),
      companyName: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        this.formValidator.requiredNoWhitespaceFill(),
        this.formValidator.forbiddenCharactersString()
      ]),
      companyAddress: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        this.formValidator.requiredNoWhitespaceFill(),
        this.formValidator.forbiddenCharactersString()
      ]),
      companySubject: new FormControl('', [
        Validators.maxLength(50),
        this.formValidator.forbiddenCharactersString()
      ]),
      companyZipCode: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        this.formValidator.requiredNoWhitespaceFill(),
        this.formValidator.forbiddenCharactersString()
      ]),
      companyCity: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        this.formValidator.requiredNoWhitespaceFill(),
        this.formValidator.forbiddenCharactersString()
      ])
    });
  }
}
