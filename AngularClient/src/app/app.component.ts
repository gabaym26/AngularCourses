import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { User } from "./modules/users/user.model";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  template: `
  <h1>{{title}}</h1>
  <h2>you succeed!!!</h2>(
  <br>
  <p> {{getWish()}}</p>`,

  selector: 'app-root',
  templateUrl: 'app.component.html'

})
export class AppComponent implements OnInit {
  currentUser?: User;
  isLecturer?: boolean;
  ngOnInit(): void {
   
  }

  constructor(private _router: Router) { }

  getWish() {

    if (Date.now().toString() > "2023/11/1")
      return "good morning!";
    else
      return "good evening!";
  }
  existsUser() {
    const storedData = sessionStorage.getItem('userData');
    if (storedData) {
      this.currentUser = JSON.parse(storedData);
    }
    const storedIsLecturer = sessionStorage.getItem('isLecturer');
    if (storedIsLecturer) {
      this.isLecturer = JSON.parse(storedIsLecturer);
    }
    if (this.isLecturer == false || this.currentUser == null) {

      this._router.navigate(['/login']);
      Swal.fire('Login again!', 'You are not lecturer in the site', 'error');
    }
    else {
      this._router.navigate(['/addCourse']);
    }
  }
}