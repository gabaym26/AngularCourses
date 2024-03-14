import { Component, OnInit } from '@angular/core';
import { User } from '../users/user.model';
import { UserService } from '../users/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Course } from '../Courses/course.model';
import { LecturerService } from '../lecturers/lecturer.service';
import { Lecturer } from '../lecturers/lecturer.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: User[] = [];
  usersForm: FormGroup;
  isLecturer?: boolean;
  lecturers?:Lecturer[];
  constructor(private _userService: UserService,private _lecturerService:LecturerService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.usersForm = new FormGroup({
      name: new FormControl(''),
      password: new FormControl(''),
      course: new FormControl('')
    });
  }
  ngOnInit(): void {
    this._userService.getUsersFromServer().subscribe(data => {
      this.users = data;
      console.log("users:", this.users);
    });
    this.activatedRoute.queryParams.subscribe(params => {
      if (params) {
        this.isLecturer = params['isLecturer'];
      }
    });
    this._lecturerService.getLecturers().subscribe(data => {
      this.lecturers = data;
      console.log("lllll"+this.lecturers+"l"+this.isLecturer)
    });
  }

  checkUser() {
    const name = this.usersForm.value.name;
    const password = this.usersForm.value.password;
    if (!this.isLecturer) {
      // Check if the user exists in the array of all users
      const user = this.users.find(user => user.name === name);

      // Display alert based on whether the user exists or not
      if (user) {
        // If user exists, check if the password is correct
        if (user.password === password) {
          sessionStorage.setItem('userData', JSON.stringify(user));
          sessionStorage.setItem('isLecturer', JSON.stringify(false));
          Swal.fire('Hi '+user.name, 'You Are Student!', 'info');
          this.router.navigate(['/allCourses']);
        } else {
          Swal.fire('Error', 'Wrong Password', 'error');
        }
      } else {
        // If user does not exist, navigate to the register component
        this.router.navigate(['/register'], { queryParams: { userName: name } });
      }
    }
    else{
      const lecturer = this.lecturers?.find(lecturer => lecturer.name === name);
      if (lecturer) {
        // If user exists, check if the password is correct
        if (lecturer.password == password) {
          sessionStorage.setItem('userData', JSON.stringify(lecturer));
          sessionStorage.setItem('isLecturer', JSON.stringify(true));
          Swal.fire('Hi '+lecturer.name, 'You Are Lecturer!', 'info');
          this.router.navigate(['/allCourses']);
        } else {
          Swal.fire('Error', 'Wrong Password', 'error');
        }
      }
       else {
        // If user does not exist, navigate to the register component
        Swal.fire('Error', 'You Dont Exit In The Lecturer Database', 'error');
        this.router.navigate(['/login']);
      }
    }
  }
  lecturer() {
    this.router.navigate(['/login'], { queryParams: { isLecturer: true } });
  }
}
