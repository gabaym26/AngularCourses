import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from '../course.model';
import { Category } from '../../categories/category.model';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoryService } from '../../categories/category.service';
import { User } from '../../users/user.model';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  @Input()
  course?: Course;

  @Input()
  isEdit?: boolean;
  
  remove:boolean=false;
  @Output()
  courseChanged : EventEmitter<any>=new EventEmitter<any>();
  name?: string = this.course?.name;
  startDate?: Date = this.course?.startDate;
  image?: string = this.course?.image;
  learningWay?: number = this.course?.learningWay;
  categoryId?: number = this.course?.categoryId;
  inputs: string[] = [" "]; // מערך שמכיל את תיבות הקלט, מתחיל עם תיבה ריקה בהתחלה
  l: number = this.inputs.length;
  categories?: Category[];
  courseForm: FormGroup;

  constructor(private route: ActivatedRoute, private _courseService: CourseService, private _categoryService: CategoryService, private _router: Router) {
    this.courseForm = new FormGroup({
      name: new FormControl(this.name, [Validators.required, Validators.minLength(2)]),
      startDate: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      learningWay: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required])
    });
  }
  ngOnInit(): void {
    this._categoryService.getCategoriesFromServer().subscribe(data => {
      this.categories = data;
    })
    this.remove=false;

  }

 
  onInput(event: Event, index: number): void {

    const target = event.target as HTMLInputElement;
    const value = target.value.trim();

    if (value && index === this.inputs.length - 1) {
      this.inputs.push(value);
    }
    else if (!value && index < this.inputs.length - 1) {
      this.inputs.splice(index + 1, 1);
    }
  }
  saveNewCourse() {
    const courseToAdd = {
      name: this.courseForm.value.name,
      startDate: this.courseForm.value.startDate,
      image: this.courseForm.value.image,
      categoryId: this.courseForm.value.categoryId,
      lessonsAmount: this.inputs.length - 1,
      courseSyllabus: this.inputs.splice(1,this.inputs.length),
      lecturerId:+JSON.parse(sessionStorage.getItem('userData')!)?.id,
      learningWay: +this.courseForm.value.learningWay
    };
    if (!this.isEdit) {
      this._courseService.addCourse(courseToAdd).subscribe(s => {
        if (s == true) {
          Swal.fire("Success", "The course was saved successfully!!!", "success");
          this._router.navigate(['/allCourses']);
        }
        else
          Swal.fire('Error', 'Cannot add', 'error');
      })
    }
    else {
      this._courseService.editCourse(this.course?.id!, courseToAdd).subscribe(s => {
        if (s == true) {
          Swal.fire("Success", "The course was updated successfully!!!", "success");
          this.courseChanged.emit(null);
          this._router.navigate(['/allCourses']);
        }
        else
          Swal.fire('Error', 'Cannot Update', 'error');

      })
    }

  }
  removes(){
    this.remove=true;    
  }
}


