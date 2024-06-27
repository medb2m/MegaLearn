import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { CategoriesService, AlertService } from '@app/_services';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['add-edit-category.component.css']
})
export class AddEditCategoryComponent {
  form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        public router: Router,
        private catService: CategoriesService,  
        private alertService: AlertService,
        private location : Location
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        this.form = this.formBuilder.group({
            name: ['', Validators.required],
        });

        this.title = 'Create Category'
        if (this.id) {
            // edit mode
            this.title = 'Edit Category'
            this.loading = true;
            this.catService.getById(this.id)
                .pipe(first())
                .subscribe(category => {
                  this.form.patchValue(category)
                  this.loading = false
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        this.alertService.clear();

        if (this.form.invalid) {
            return;
        }

        this.submitting = true;

        let saveCategory;
        let message: string;
        if (this.id) {
            saveCategory = () => this.catService.update(this.id!, this.form.value);
            message = 'Category updated';
        } else {
          saveCategory = () => this.catService.create(this.form.value);
            message = 'Category created';
        }

        saveCategory()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success(message, { keepAfterRouteChange: true });
                    this.location.back()
                    this.submitting= false
                },
                error: () => {
                    this.alertService.error("erreur");
                    this.submitting = false;
                }
            });
    }
}
