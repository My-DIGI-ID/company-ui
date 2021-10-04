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
import {CredentialFormComponent} from './credential-form.component';
import {ValidatorFn, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormValidator} from 'src/app/utilities/form-validators/form-validator';
import {NotificationService} from 'carbon-components-angular';
import {By} from '@angular/platform-browser';
import {TranslateModule} from '@ngx-translate/core';

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

describe('CredentialFormComponent', () => {
  let component: CredentialFormComponent;
  let fixture: ComponentFixture<CredentialFormComponent>;

  beforeEach(async () => {
    const notificationServiceMock = jasmine.createSpyObj('NotificationService', ['showNotification']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [
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
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('instance should be successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('if the form is invalid, form should not be submitted', () => {
    const submitButton = fixture.debugElement.query(By.css('#create-employee-submit-button'));

    expect(submitButton.nativeElement.getAttribute('disabled')).toEqual('');
  });

  it('discard event should emit after clicking the discard button', () => {
    const discardEmitterSpy = spyOn(component['discardForm'], 'emit');
    const discardButton = fixture.debugElement.query(By.css('#create-employee-discard-button')).nativeElement;

    discardButton.click();

    expect(discardEmitterSpy).toHaveBeenCalledTimes(1);
  });

  describe ('If the form is filled with the valid employee details', () => {
    it('submit event should emit after clicking the submit button', () => {
      component.credentialForm.get('firstName')!.setValue('Ana');
      component.credentialForm.get('lastName')!.setValue('Stracciatella');
      component.credentialForm.get('email')!.setValue('ana@email');
      component.credentialForm.get('id')!.setValue('id-123');
      component.credentialForm.get('companyName')!.setValue('Bee Company');
      component.credentialForm.get('companySubject')!.setValue('IT');
      component.credentialForm.get('companyAddress')!.setValue('Summer street 12');
      component.credentialForm.get('companyZipCode')!.setValue('8090');
      component.credentialForm.get('companyCity')!.setValue('Arnhem');

      fixture.detectChanges();

      const submitEmitterSpy = spyOn(component['submitForm'], 'emit');
      const submitButton = fixture.debugElement.query(By.css('#create-employee-submit-button')).nativeElement;

      submitButton.click();

      expect(submitEmitterSpy).toHaveBeenCalledTimes(1);
    });
  });
});
