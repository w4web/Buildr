import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'custom-date',
  template: `
    <div class="form-group">
      <input type="text" class="custom-input d-none" [formControl]="formControl" [formlyAttributes]="field" />
      <h5>{{ viewTitle }}</h5>
      <calendar
        [calendarMode]="calendar.mode"
        [currentDate]="calendar.currentDate"
        (onTitleChanged)="onViewTitleChanged($event)"
        (onTimeSelected)="onTimeSelected($event)"
        lockSwipes="true"
        [monthviewEventDetailTemplate]="template"
      >
      </calendar>
      <ng-template #template let-showEventDetail="showEventDetail" let-selectedDate="selectedDate" let-noEventsLabel="noEventsLabel">
      </ng-template>
    </div>
  `,
})
export class CustomDateComponent extends FieldType {

  formControl: any;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  viewTitle: string;
  showEventDetail = false;

  constructor() {
    super();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onTimeSelected(ev) {
    this.formControl.setValue(new Date(ev.selectedTime));
  }

}
