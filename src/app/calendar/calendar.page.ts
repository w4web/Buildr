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
    isEvent = false;
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

        this.workoutService.workoutList$.pipe(
            map((data: any) => {
                for (var i = 0; i < data.length; i ++) {
                    data[i].startTime = new Date(data[i].startTime);
                    data[i].endTime = new Date(data[i].endTime);
                }
                return data;
            })
        ).subscribe((data: any) => {
            this.eventSource = data;
        });
    }

    next() {
        this.myCal.slideNext();
    }

    back() {
        this.myCal.slidePrev();
    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    today() {
        this.calendar.currentDate = new Date();
    }

    onTimeSelected(ev) {

        console.log("Date select", ev);

        if(ev.events !== undefined && ev.events.length !== 0) {
            this.isEvent = true;
        } else {
            this.isEvent = false;
        }
    }

    onEventSelected(event) {
        console.log('Event selected:', event);
    }

    onCurrentDateChanged(event: Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
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
