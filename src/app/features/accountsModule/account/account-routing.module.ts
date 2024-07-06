import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { VerifyEmailComponent } from './verify-email';
import { ForgotPasswordComponent } from './forgot-password';
import { ResetPasswordComponent } from './reset-password';

<<<<<<< HEAD

=======
>>>>>>> 6fc3a2271eb8225e1dccda0dac38ac604ab21559
const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'verify-email', component: VerifyEmailComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
<<<<<<< HEAD
            { path: 'reset-password', component: ResetPasswordComponent },
          

=======
            { path: 'reset-password', component: ResetPasswordComponent }
>>>>>>> 6fc3a2271eb8225e1dccda0dac38ac604ab21559
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountsRoutingModule { }