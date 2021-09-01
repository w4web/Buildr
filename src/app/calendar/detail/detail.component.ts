import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from 'src/app/shared/services/workout.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {

  id:any;
  singleDetail:any;

  constructor( public workoutService: WorkoutService, public HttpClient: HttpClient, public activatedRoute: ActivatedRoute ) {

    this.workoutService.init();
    this.id = this.activatedRoute.snapshot.params.id;

  }

  ngOnInit() {
    this.workoutService.workoutList$.pipe(
      map((data: any) => {
          const result = data.filter(item => item.title == this.id);
          return result;
        })
      ).subscribe(data => {
          this.singleDetail = data[0];
          console.log("Single data", this.singleDetail);
      });
  }

}