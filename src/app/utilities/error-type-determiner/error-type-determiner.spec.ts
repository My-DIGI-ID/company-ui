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

import {ErrorTypeDeterminer} from './error-type-determiner';
import {HttpErrorResponse} from '@angular/common/http';

describe('ErrorTypeDeterminer', () => {
  it('IS_HTTP_ERROR_RESPONSE should return true if given HttpErrorResponse', () => {
    const httpErrorResponse = new HttpErrorResponse({
      error: 'any',
      status: 400,
      statusText: 'Something went wrong',
      url: 'test-url.com'
    });

    expect(ErrorTypeDeterminer.IS_HTTP_ERROR_RESPONSE(httpErrorResponse)).toBeTrue();
  });

  it('IS_ERROR_TYPE_BAD_REQUEST should return true if given error object with Bad Request type', () => {
    const errorBadRequest = {
      error: 'Bad Request',
      message: 'An employee with the given id already exists.',
      path: '/api/employee',
      status: 400,
      timestamp: '2021-03-10T14:46:18.374+0000',
      trace: 'org.springframework.web.server.Response'
    };

    expect(ErrorTypeDeterminer.IS_ERROR_TYPE_BAD_REQUEST(errorBadRequest)).toBeTrue();
  });
});
