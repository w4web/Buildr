import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { CalendarComponent } from "ionic2-calendar";
import { WorkoutService } from '../shared/services/workout.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.page.html',
    styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

    eventSource;
    viewTitle;

    isToday: boolean;
    calendar = {
        mode: 'month' as CalendarMode,
        step: 30 as Step,
        currentDate: new Date()
    };

    @ViewChild(CalendarComponent) myCal: CalendarComponent;

    constructor(public workoutService: WorkoutService, private navController: NavController) {
        this.workoutService.init();
    }

    ngOnInit() {
        // this.workoutService.workoutList$.pipe(
        //     map((data:any, i)=>{
        //         data[i].startTime = new Date(data[i].startTime);
        //         console.log("index", i);
        //         return data;
        //     })
        //   ).subscribe((data: any) => {
        //     this.eventSource = data;
        //     console.log("accepted date", data);
        // });

        this.loadEvents();
    }

    next() {
        this.myCal.slideNext();
    }

    back() {
        this.myCal.slidePrev();
    }

    loadEvents() {

        this.eventSource = this.createRandomEvents()
    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }

    today() {
        this.calendar.currentDate = new Date();
    }

    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    onCurrentDateChanged(event: Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

    createRandomEvents(): void {
        let events = [];

        events.push({
            title: 'Event - ',
            startTime: new Date("Tue Aug 10 2021 12:00:00 GMT+0530"),
            endTime: new Date("Tue Aug 10 2021 12:00:00 GMT+0530"),
            allDay: false
        });

         this.workoutService.workoutList$.pipe(
             map((data:any)=>{
                 data[0].startTime = new Date(data[0].startTime);
                 data[0].endTime = new Date(data[0].endTime);
                 return data;
             })
           ).subscribe((data: any) => {
            this.eventSource = data;
         });


    }

    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    markDisabled = (date: Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };

}
