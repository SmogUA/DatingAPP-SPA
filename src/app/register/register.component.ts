import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
register() {
this.authService.register(this.model).subscribe(() => {
console.log('Register OK');
}, error => {
 console.log('Register FAIL');
});
}

cancel() {
this.cancelRegister.emit(false);
}

}