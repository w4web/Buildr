import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { CalendarComponent } from "ionic2-calendar";
import { WorkoutService } from '../shared/services/workout.service';

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
        this.workoutService.workoutList$.subscribe((data: any) => {
            this.eventSource = data;
            console.log("mmm", Date.parse(data[0].startTime));
        });
    }

    next() {
        this.myCal.slideNext();
    }

    back() {
        this.myCal.slidePrev();
    }

    // loadEvents() {
    //     this.eventSource = this.createRandomEvents();
    // }

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

    // createRandomEvents() {
    //     var events = [];
    //     for (var i = 0; i < 50; i += 1) {
    //         var date = new Date();
    //         var eventType = Math.floor(Math.random() * 2);
    //         var startDay = Math.floor(Math.random() * 90) - 45;
    //         var endDay = Math.floor(Math.random() * 2) + startDay;
    //         var startTime;
    //         var endTime;
    //         if (eventType === 0) {
    //             startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
    //             if (endDay === startDay) {
    //                 endDay += 1;
    //             }
    //             endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
    //             events.push({
    //                 title: 'All Day - ' + i,
    //                 startTime: startTime,
    //                 endTime: endTime,
    //                 allDay: true
    //             });
    //         } else {
    //             var startMinute = Math.floor(Math.random() * 24 * 60);
    //             var endMinute = Math.floor(Math.random() * 180) + startMinute;
    //             startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
    //             endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
    //             events.push({
    //                 title: 'Event - ' + i,
    //                 startTime: startTime,
    //                 endTime: endTime,
    //                 allDay: false
    //             });
    //         }
    //     }
    //     return events;
    // }

    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    markDisabled = (date: Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };

}
