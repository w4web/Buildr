import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WorkoutService } from 'src/app/shared/services/workout.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  @ViewChild('reset', { static: false }) reset?: ElementRef<HTMLElement>;

  constructor(public workoutService: WorkoutService, private router: Router) {

    this.workoutService.getWorkoutFields().subscribe((fields: any) => {
      this.form = new FormGroup({});
      this.fields = fields;
    });

  }

  ngOnInit() {
    
    setTimeout(() => {
      this.form.get('title')!.setValue(Math.floor(Math.random() * 1000));
    }, 1000);
    
  }

  save() {
    this.form.get('endTime')!.setValue(this.model.startTime);
    this.workoutService.add(this.model);
    this.router.navigate(['/tabs/calendar']);
    this.resetFields();
  }

  resetFields(): void {
    if (this.reset) {
      const el: HTMLElement = this.reset.nativeElement;
      el.click();
    }
  }

}
