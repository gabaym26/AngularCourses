import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../course.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit{
  @Input()
  course?:Course;

  ngOnInit(): void {

  }
  constructor(private route: ActivatedRoute,private router: Router){

}
}