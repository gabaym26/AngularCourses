import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Course } from '../course.model';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';
import { Category } from '../../categories/category.model';
import { CategoryService } from '../../categories/category.service';
import { User } from '../../users/user.model';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss']
})
export class AllCoursesComponent implements OnInit {
  @Output()
  courseNumberChanged : EventEmitter<void>=new EventEmitter<void>();

  c?:string;
  categoryId?:number;
  selectedCourse?:Course;
  courses: Course[] = [];
  ALLCOURSES: Course[] = [];
  categories: Category[] = [];
  learning?:string[]=["Frontal","Zoom"];
  currentUser?:User;
  constructor(private _courseService :CourseService,private _categoryService:CategoryService,private router: Router) {

  }
  ngOnInit(): void {
    this._courseService.getCoursesFromServer().subscribe(data=>{
      this.ALLCOURSES=data;
      this.courses=data;
    })
    this._categoryService.getCategoriesFromServer().subscribe(data=>{
      this.categories=data;
    })
    const storedData = sessionStorage.getItem('userData');
    if (storedData) {
      this.currentUser = JSON.parse(storedData);
    }
  }
  selectCourse(c: Course) {
    this.selectedCourse = c;
    this.courseNumberChanged.emit();
  }
  courseChange(e:any){
    this._courseService.getCoursesFromServer().subscribe(data=>{
      this.ALLCOURSES=data;
      this.courses=data;
    })
  }
  changeCourseName(name:any){
    this.courses=this.ALLCOURSES.filter(x=>x.name==name.target.value||name.target.value=="")
  }
  select(e:any){
    this.c=e.target.value;
    this.categories.forEach(element => {
      if(element.name==this.c){
        this.categoryId=element.id;
      }
      this.courses=this.ALLCOURSES.filter(x=>this.c==""||x.categoryId==this.categoryId)
    });
  }
  learningWay(e:any){
  let lW=this.learning?.indexOf(e.target.value);
    this.courses=this.ALLCOURSES.filter(x=>e.target.value==""||x.learningWay==lW)
  }
 
}

