import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent {
  constructor() { }
  logOut() {
    sessionStorage.removeItem('userData');
    Swal.fire("Success","You logged out successfully!!!","success");
  }
}
