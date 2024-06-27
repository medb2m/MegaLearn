import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from '@core/interceptors';
import { AccountService } from '@app/_services';
import { appInitializer } from '@core/helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from '@features/home';
import { SharedModule } from '@shared/shared.module';
import { BackButtonComponent } from './shared/components/back-button';
import { NgxMaskModule } from 'ngx-mask'
//import { PlyrModule } from 'ngx-plyr';



@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        SharedModule,
        NgxMaskModule.forRoot()
        //PlyrModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        BackButtonComponent,
    ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }