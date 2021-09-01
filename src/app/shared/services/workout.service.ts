import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  public workoutList;
  public workoutList$ = new Subject<string>();

  constructor(private http: HttpClient) {
    this.init();
  }

  serveIt(): any {
    this.workoutList$.next(JSON.parse(localStorage.getItem('workouts')));
  }

  init(): any {
    this.http.get<any>('./assets/workoutList.json').subscribe((data) => {
      this.workoutList = data;
      this.load();
      this.serveIt();
    })
  }

  load(): any {
    if (localStorage.getItem('workouts') === null || localStorage.getItem('workouts') == undefined) {
      localStorage.setItem('workouts', JSON.stringify(this.workoutList));
    }
  }

  add(workout): any {
    let workouts = JSON.parse(localStorage.getItem('workouts'));
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
    this.serveIt();
  }

  remove(id) {
    let workouts = JSON.parse(localStorage.getItem('workouts'));
    for (let i = 0; i < workouts.length; i++) {
      if (workouts[i].title == id) {
        workouts.splice(i, 1);
      }
    }
    localStorage.setItem('workouts', JSON.stringify(workouts));
    this.serveIt();
  }

}
