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
import {HeaderComponent} from './header.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReplaySubject} from 'rxjs';
import {By} from '@angular/platform-browser';
import {CurrentUser} from '../../utilities/user/current-user/current-user';
import {TranslateModule} from '@ngx-translate/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const otherAvailableButtonIds = {
    companyName: '#header-company-name',
    companyLogo: '#header-company-logo',
    loggedIn: '#unlocked-icon',
    loggedOut: '#locked-icon'
  };

  beforeEach(async () => {
    const currentUser = {
      loggedIn$: new ReplaySubject<boolean>(1),
      isAdmin: () => undefined
    };
    currentUser.loggedIn$.next(true);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [HeaderComponent],
      providers: [
        {
          provide: CurrentUser,
          useValue: currentUser
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('instance should be successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('I should be able to see the company logo', () => {
    const companyLogo = fixture.debugElement.query(By.css(otherAvailableButtonIds.companyLogo));

    expect(companyLogo).toBeTruthy();
  });

  it('I should be able to see the company name', () => {
    const companyName = fixture.debugElement.query(By.css(otherAvailableButtonIds.companyName));

    expect(companyName).toBeTruthy();
  });

  describe('If I am logged in', () => {
    beforeEach(() => {
      component.currentUser.loggedIn$.next(true);

      fixture.detectChanges();
    });

    it('I should be able to see the unlocked button', () => {
      const unlockedIcon = fixture.debugElement.query(By.css(otherAvailableButtonIds.loggedIn));

      expect(unlockedIcon).toBeTruthy();
    });

    it('I should not be able to see display the locked button', () => {
      const lockedIcon = fixture.debugElement.query(By.css(otherAvailableButtonIds.loggedOut));

      expect(lockedIcon).toBeFalsy();
    });
  });

  describe('If I am not logged in', () => {
    beforeEach(() => {
      component.currentUser.loggedIn$.next(false);

      fixture.detectChanges();
    });

    it('I should not be able to see the unlocked button', () => {
      const unlockedIcon = fixture.debugElement.query(By.css(otherAvailableButtonIds.loggedIn));

      expect(unlockedIcon).toBeFalsy();
    });

    it('I should be able to see the locked button', () => {
      const lockedIcon = fixture.debugElement.query(By.css(otherAvailableButtonIds.loggedOut));

      expect(lockedIcon).toBeTruthy();
    });
  });
});
