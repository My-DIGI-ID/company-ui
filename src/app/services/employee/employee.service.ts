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

import {Injectable} from '@angular/core';
import {EmployeeDTO, EmployeesService} from '../../../api-client';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public constructor(private readonly employeesAPI: EmployeesService) {
  }

  public async getAllEmployees(): Promise<EmployeeDTO[]> {
    return await this.employeesAPI.getAllEmployees().toPromise();
  }

  public async createEmployee(employee: EmployeeDTO): Promise<EmployeeDTO> {
    return await this.employeesAPI.createEmployee(employee).toPromise();
  }

  public async createEmployeesFromCSVFile(file: any): Promise<any> {
    return await this.employeesAPI.createEmployeeByCsv(file).toPromise();
  }

  public async createInvitation(id: string): Promise<string> {
    const invitationResponse = await this.employeesAPI.createInvitation(id).toPromise();

    return invitationResponse.url;
  }

  public async deleteEmployee(userId: string): Promise<void> {
    return await this.employeesAPI.deleteEmployeeById(userId).toPromise();
  }

  public async createEmailInvitation(userId: string): Promise<Blob> {
    return this.employeesAPI.createInvitationAsEMail(userId).toPromise();
  }
}
