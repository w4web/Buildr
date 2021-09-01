import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyIonicModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } })
  ],
  exports: [
    ReactiveFormsModule,
    FormlyIonicModule
  ]
})

export class SharedModule { }
