import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CalendarPageRoutingModule } from './calendar-routing.module';
import { CalendarPage } from './calendar.page';

import { NgCalendarModule  } from 'ionic2-calendar';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';
import { FormlyModule } from '@ngx-formly/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { CustomDateComponent } from '../shared/components/formly/date.component';

export function minlengthValidationMessages(err: any, field: any): any {
  return `Should have atleast ${field.templateOptions.minLength} characters`;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    NgCalendarModule,
    FontAwesomeModule,
    SharedModule,
    FormlyModule.forRoot({
      types: [
        { name: 'custom-date', component: CustomDateComponent }
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'minlength', message: minlengthValidationMessages },
      ],
    }),
  ],
  declarations: [CalendarPage, AddComponent, DetailComponent, CustomDateComponent]
})
export class CalendarPageModule {}
