import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@core/helpers';

@Component({ templateUrl: 'update.component.html' })
export class UpdateComponent implements OnInit {
    account = this.accountService.accountValue!;
    form!: FormGroup;
    submitting = false;
    submitted = false;
    deleting = false;

    selectedFile: File | null = null;
    previewUrl: string | ArrayBuffer | null | undefined = null;


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: [this.account.title, Validators.required],
            firstName: [this.account.firstName, Validators.required],
            username: [this.account.username, Validators.required],
            lastName: [this.account.lastName, Validators.required],
            email: [this.account.email, [Validators.required, Validators.email]],
            password: ['', [Validators.minLength(6)]],
            confirmPassword: [''],
            image: ['']
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
        this.previewUrl = this.account.image
    }

   


    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }


    // Handle file selection
    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
    
        if (this.selectedFile) {
          const reader = new FileReader();
          reader.onload = () => {
            this.previewUrl = reader.result;
          };
          reader.readAsDataURL(this.selectedFile);
        }
      }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.submitting = true;
        // create formDATA
        const formData = new FormData()
        formData.append('title', this.form.get('title')?.value)
        formData.append('username', this.form.get('username')?.value)
        formData.append('firstName', this.form.get('firstName')?.value)
        formData.append('lastName', this.form.get('lastName')?.value)
        formData.append('email', this.form.get('email')?.value)
        if (this.form.get('password')?.value){
            formData.append('password', this.form.get('password')?.value);
            formData.append('confirmPassword', this.form.get('confirmPassword')?.value);
        }

        if (this.selectedFile) {
            formData.append('image', this.selectedFile);
        }


        this.accountService.update(this.account.id!, formData)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            });
    }

    onDelete() {
        if (confirm('Are you sure?')) {
            this.deleting = true;
            this.accountService.delete(this.account.id!)
                .pipe(first())
                .subscribe(() => {
                    this.alertService.success('Account deleted successfully', { keepAfterRouteChange: true });
                });
        }
    }
    
}