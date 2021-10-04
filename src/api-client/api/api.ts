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

export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './employees.service';
import { EmployeesService } from './employees.service';
export * from './feedback.service';
import { FeedbackService } from './feedback.service';
export * from './issuedCredentials.service';
import { IssuedCredentialsService } from './issuedCredentials.service';
export * from './webhooksForACAPY.service';
import { WebhooksForACAPYService } from './webhooksForACAPY.service';
export const APIS = [AuthenticationService, EmployeesService, FeedbackService, IssuedCredentialsService, WebhooksForACAPYService];
