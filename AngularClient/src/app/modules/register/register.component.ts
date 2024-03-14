import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../users/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../users/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  users: User[] = [];
  usersForm: FormGroup;
  userStorage?:User[];
  userStorag?:User;
  @Input()
  userName?: string;

  constructor(private _userService: UserService, private router: ActivatedRoute, private _router: Router) {
    this.usersForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      address: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.usersForm.patchValue({
        name: params['userName']
      });
    });
    this._userService.getUsersFromServer().subscribe(data => {
      this.users = data;
    });
  }
  addUser() {
    const userToAdd = {
      name: this.usersForm.value.name,
      password: this.usersForm.value.password,
      address: this.usersForm.value.address,
      email: this.usersForm.value.email
    };
  sessionStorage.setItem('userData', JSON.stringify(userToAdd));
  sessionStorage.setItem('isLecturer', JSON.stringify(false));
    if (this.users.find(x => x.name == userToAdd.name && x.password == userToAdd.password && x.address == userToAdd.address && x.email == userToAdd.email)) {
      Swal.fire("this user already exists!!!");
      this._router.navigate(['/allCourses']);
    }
    else {
      this._userService.addUser(userToAdd).subscribe(s => {
        if (s == true){
          this._router.navigate(['/allCourses']);}
        else
          alert("false");
      })
    }
  }
}
