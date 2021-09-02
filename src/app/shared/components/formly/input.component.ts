import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'custom-input',
  template: `
    <div class="form-group">
      <label>{{to.label}}</label>
      <input type="text" class="custom-input" [formControl]="formControl" [formlyAttributes]="field" />
    </div>
  `,
})
export class CustomInputComponent extends FieldType {

  constructor() {
    super();
  }

}
