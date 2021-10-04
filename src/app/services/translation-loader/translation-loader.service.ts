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

import {LOCATION_INITIALIZED} from '@angular/common';
import {Injectable, Injector} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

@Injectable({providedIn: 'root'})
export class TranslationLoaderService {

  public constructor (private readonly translate: TranslateService,
                      private readonly injector: Injector,
                      public readonly translateHttpLoader: TranslateHttpLoader) {
  }

  public translationLoaderFactory(): () => Promise<any> {
    return async() => new Promise<any>(() => {
      const locationInitialized = this.injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
      const defaultLanguage = this.translate.defaultLang;

      locationInitialized.then(() => {
        this.translateHttpLoader.getTranslation(defaultLanguage);
      });
    });
  }
}
