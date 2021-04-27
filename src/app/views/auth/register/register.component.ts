import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidators } from 'src/app/validators/custom-validate';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword: boolean = false;
  showPasswordConfirm: boolean = false;

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        passwordConfirm: ['', [Validators.required]],
      },
      {
        validator: CustomValidators.MatchPassword,
      }
    );
  }

  register() {
    if (!this.registerForm.valid) return;
    const params = { ...this.registerForm.value };
    this.authService
      .register(params)
      .pipe(
        map((res) => {
          this.toastr.success(res.message);
          this.router.navigate(['/login']);
        }),
        catchError((error): any => {
          this.toastr.error(error);
        })
      )
      .subscribe();
  }

  get email() {
    return this.registerForm.get('email');
  }
  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }
  get passwordConfirm() {
    return this.registerForm.get('passwordConfirm');
  }
}
