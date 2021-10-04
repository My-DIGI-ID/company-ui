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

export class EmailInvitationFile {
  private readonly file: Blob;
  private readonly filename: string;
  private readonly type: string = 'messages/rfc822';

  public constructor(fileData: Blob, employeeId: string) {
    this.file = new Blob([fileData], {type: this.type});
    this.filename = `${employeeId}-invitation.eml`;
  }

  public isNotEmpty(): boolean {
    return this.file.size > 0;
  }

  public download(): void {
    const url = window.URL.createObjectURL(this.file);
    const link = document.createElement('a');

    link.href = url;
    link.download = this.filename;

    link.click();
    window.URL.revokeObjectURL(url);
  }
}
