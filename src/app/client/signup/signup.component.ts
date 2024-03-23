import { Component } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { IUser } from '../../models/User'; 
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
//import { SessionStorageService } from 'angular-sessionstorage';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,
  //  SessionStorageService 
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  formData: IUser = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  };

  constructor(private userService: UserService,
    private router: Router,
    //private sessionStorage: SessionStorageService
    ) { }

  onSubmit(signupForm: NgForm) {
    if (signupForm.valid) {
      this.userService.createUser(this.formData)
        .subscribe({
          next: () => {
            console.log('User signed up successfully!');
           // this.sessionStorage.set('user', this.formData); 
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Error signing up:', error);
          }
        });
    } else {
      console.error('Form is invalid.');
    }
  }
}
