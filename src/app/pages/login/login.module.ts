import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { InputModule } from 'src/app/shared/input/input.module';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [
    CommonModule, ReactiveFormsModule, InputModule, MatButtonModule, MatCardModule
  ]
})
export class LoginModule { }
