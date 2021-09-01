import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CalendarPageRoutingModule } from './calendar-routing.module';
import { CalendarPage } from './calendar.page';

import { NgCalendarModule  } from 'ionic2-calendar';
import { AddComponent } from './add/add.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [CalendarPage, AddComponent, DetailComponent]
})
export class CalendarPageModule {}
