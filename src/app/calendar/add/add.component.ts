import { Component, OnInit } from '@angular/core';
import { WorkoutService } from 'src/app/shared/services/workout.service';
import { Router } from '@angular/router';

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
  showEventDetail = false;
  
  event:any = {
    title: Math.floor(Math.random() * 1000),
    weight: '',
    calories: '',
    energie: '',
    sleep: '',
    startTime: null,
    endTime: null,
    allDay: false
  };

  constructor(public workoutService: WorkoutService, private router: Router) {}

  ngOnInit() {
  }

  save() {
    this.workoutService.add(this.event);
    this.router.navigate(['/tabs/calendar'])
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onTimeSelected(ev) {
    this.event.startTime = new Date(ev.selectedTime);
    this.event.endTime = new Date(ev.selectedTime);
  }

}
