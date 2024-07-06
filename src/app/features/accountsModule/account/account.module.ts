import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { VerifyEmailComponent } from './verify-email';
import { ForgotPasswordComponent } from './forgot-password';
import { ResetPasswordComponent } from './reset-password';

<<<<<<< HEAD

=======
>>>>>>> 6fc3a2271eb8225e1dccda0dac38ac604ab21559
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountsRoutingModule
    ],
    declarations: [
        LayoutComponent,
        LoginComponent,
        RegisterComponent,
        VerifyEmailComponent,
        ForgotPasswordComponent,
<<<<<<< HEAD
        ResetPasswordComponent,
       
=======
        ResetPasswordComponent
>>>>>>> 6fc3a2271eb8225e1dccda0dac38ac604ab21559
    ]
})
export class AccountsModule { }