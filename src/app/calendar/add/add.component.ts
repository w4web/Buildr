import { Component, OnInit } from '@angular/core';
import { WorkoutService } from 'src/app/shared/services/workout.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  viewTitle: string;
  
  event:any = {
    title: '',
    weight: '',
    startTime: null,
    endTime: '',
    allDay: true
  };

  constructor(public workoutService: WorkoutService) {}

  ngOnInit() {
  }

  save() {    
    console.log("New event", this.event);
    this.workoutService.add(this.event);
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onTimeSelected(ev) {    
    this.event.startTime = new Date(ev.selectedTime);
  }

}
