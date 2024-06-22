import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { EntityService, AlertService } from '@app/_services';
import { Entity } from '@app/_models'

@Component({templateUrl: 'add-edit-entity.component.html' , styleUrls: ['add-edit-entity.component.css']})
export class AddEditEntityComponent implements OnInit {

    // Form decla
    form!: FormGroup;

    // Image_Attribut 
    selectedFile: File | null = null;
    previewUrl: string | ArrayBuffer | null | undefined = null;

    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    attributType = ''
    entityId ?: any



    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        public router: Router,
        private entityService: EntityService,    
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['entityId'];

        this.form = this.formBuilder.group({
            attribut_1: ['', Validators.required],
            attribut_2: ['', Validators.required],
            desc_attribut: ['', [Validators.required, Validators.minLength(6)]],
            num_attribut: [0, [Validators.required, Validators.min(0)]],
            image : [''],
        });


        this.title = 'Create Entity';
        if (this.id) {
            // edit mode
            
            this.title = 'Edit Entity';
            this.loading = true;
            this.entityService.getById(this.id)
                .pipe(first())
                .subscribe((entity : Entity) => {
                    this.form.patchValue({
                        attribut_1 : entity.attribut_1,
                        attribut_2 : entity.attribut_2,
                        desc_attribut : entity.desc_attribut,
                        num_attribut : entity.num_attribut,
                    });
                    this.entityId = entity._id
                    this.previewUrl = entity.image
                    this.loading = false
                });
        }
    }

    // for calls in template
    get f() { return this.form.controls }

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

        const formData = new FormData();
        formData.append('attribut_1', this.form.get('attribut_1')?.value)
        formData.append('attribut_2', this.form.get('attribut_2')?.value)
        formData.append('desc_attribut', this.form.get('desc_attribut')?.value)
        formData.append('num_attribut', this.form.get('num_attribut')?.value)

        // add image if selected
        if (this.selectedFile){
            formData.append('image', this.selectedFile)
        }

        
        // create or update course based on id param
        let saveModel;
        let message: string;
        
        if (this.id) {
            saveModel = () => this.entityService.update(this.entityId, formData);
            message = 'Entity updated';
        } else {
            saveModel = () => this.entityService.create(formData);
            message = 'Entity created';
        }


        saveModel()
            .pipe(first())
            .subscribe({
                next: () => {            
                    this.alertService.success(message, { keepAfterRouteChange: true });
                    //this.router.navigateByUrl('listEntity');
                },
                error: (error) => {
                    this.alertService.error(error)
                    this.submitting = false
                }
            });
    }
}
