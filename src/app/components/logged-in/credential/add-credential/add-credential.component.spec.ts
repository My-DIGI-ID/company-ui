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

/* tslint:disable:no-identical-functions */

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AddCredentialComponent} from './add-credential.component';
import {ValidatorFn, ReactiveFormsModule} from '@angular/forms';
import {FormValidator} from 'src/app/utilities/form-validators/form-validator';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component} from '@angular/core';
import {ApplicationURL} from 'src/app/utilities/application-url';
import {ModalService} from 'carbon-components-angular';
import {TranslateModule} from '@ngx-translate/core';
import Spy = jasmine.Spy;
import {CredentialFormComponent} from '../credential-form/credential-form.component';
import {NotificationService} from '../../../../services/notification/notification.service';

@Component({
  selector: 'app-credential-input-form-mock-component',
  template: ''
})
class CredentialFormMockComponent {
}

class FormValidatorMock {
  public isFormControlInvalidAfterTouch(formControl: any): boolean {
    return false;
  }

  public requiredNoWhitespace(): ValidatorFn {
    return (control: any): { [key: string]: boolean } | null => {
      return null;
    };
  }

  public forbiddenCharactersString(): ValidatorFn {
    return (control: any): { [key: string]: boolean } | null => {
      return null;
    };
  }

  public forbiddenCharactersId(): ValidatorFn {
    return (control: any): { [key: string]: boolean } | null => {
      return null;
    };
  }

  public requiredNoWhitespaceFill(): ValidatorFn {
    return (control: any): { [key: string]: boolean } | null => {
      return null;
    };
  }

  public isEmailOfValidLength(): ValidatorFn {
    return (control: any): { [key: string]: boolean } | null => {
      return null;
    };
  }

  public getSanitizedFormStringValue(control: any): any {
    return control.value;
  }

  public getSanitizedRawFormValues(form: any): any {
    return form.getRawValue();
  }
}

describe('AddCredentialComponent', () => {
  let component: AddCredentialComponent;
  let fixture: ComponentFixture<AddCredentialComponent>;
  let routerSpy: Spy;
  let employeeServiceCreateSpy: Spy;
  const modalServiceMock = jasmine.createSpyObj('ModalService', ['create', 'destroy']);

  beforeEach(async () => {
    const notificationServiceMock = jasmine.createSpyObj('NotificationService', ['showError']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        AddCredentialComponent,
        CredentialFormComponent
      ],
      providers: [
        {
          provide: FormValidator,
          useClass: FormValidatorMock
        },
        {
          provide: NotificationService,
          useValue: notificationServiceMock
        },
        {
          provide: CredentialFormComponent,
          useClass: CredentialFormMockComponent
        },
        {
          provide: ModalService,
          useValue: modalServiceMock
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCredentialComponent);
    component = fixture.componentInstance;
    routerSpy = spyOn(component['router'], 'navigateByUrl');
    employeeServiceCreateSpy = spyOn(component['employeeService'], 'createEmployee').and.returnValue(Promise.resolve({
      employeeId: '123',
      firstName: 'Ana',
      lastName: 'Stracciatella',
      email: 'ana@email',
      firmName: 'Bee Company',
      firmSubject: 'IT',
      firmStreet: 'Summer street 12',
      firmPostalCode: '8090',
      firmCity: 'Arnhem'
    }));

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('instance should be successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('after I call the discard method, I should be taken to the "Manage Invitation" page', () => {
    component.discard();

    expect(routerSpy).toHaveBeenCalledOnceWith(ApplicationURL.ManageInvitations);
  });

  describe('after saving the form', () => {
    beforeEach(async () => {
      component['employeeService'].createEmployee = jasmine.createSpy().and.returnValue(Promise.resolve());
      spyOnProperty(component['credentialForm']!.credentialForm, 'valid', 'get').and.returnValue(true);

      await component.submitAddCredential();
    });

    it('I should be redirected to the "Manage Invitation" page', () => {
      expect(routerSpy).toHaveBeenCalledOnceWith(ApplicationURL.ManageInvitations);
    });

    it('I should not see error notification', () => {
      expect(component['notification'].showError).toHaveBeenCalledTimes(0);
    });
  });

  describe('if submit fails with an error', () => {
    beforeEach(async () => {
      spyOnProperty(component['credentialForm']!.credentialForm, 'valid', 'get').and.returnValue(true);
      component['employeeService'].createEmployee = jasmine.createSpy().and.throwError('400');

      await component.submitAddCredential();

      fixture.detectChanges();
    });

    it('I should not be redirected', () => {
      expect(routerSpy).toHaveBeenCalledTimes(0);
    });

    it('I should be able to see error notification', () => {
      expect(component['notification'].showError).toHaveBeenCalledTimes(1);
    });
  });
});
