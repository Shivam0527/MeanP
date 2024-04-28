import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { AccountserviceService } from '../accountservice.service';
import { Userloginfo } from '../userloginfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  datasaved = false;
  massage?: string;
  status?: string;

  constructor(private formbuilder: FormBuilder, private accountservice: AccountserviceService, private router: Router) { }

  ngOnInit(): void {
    this.setFormState();
  }

  setFormState(): void {
    this.loginForm = this.formbuilder.group({
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    let userinfo = this.loginForm.value;
    this.userLogin(userinfo);
    this.loginForm.reset();
  }

  userLogin(logininfo: Userloginfo) {
    this.accountservice.userlogin(logininfo).subscribe(
      (resResult) => {
        let resp = JSON.stringify(resResult);
        console.log(resp);
        this.datasaved = true;
        this.massage = (resResult as any).msg;
        this.status = (resResult as any).status;
        if ((resResult as any).status === 'success') {
          localStorage.setItem('Loginuser', resp);
          this.router.navigate(['/home']);
          alert("Logined Successfully");3
        } else {
          localStorage.removeItem('Loginuser');
        }
        this.loginForm.reset();
      },
      (error) => {
        console.error('Error occurred during login:', error);
      }
    );
  }

}
