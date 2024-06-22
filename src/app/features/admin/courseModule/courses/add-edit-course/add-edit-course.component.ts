import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { CoursesService, CategoriesService, AlertService } from '@app/_services';
import { SectionsComponent } from '../sections/sections.component';
import { Location } from '@angular/common';

@Component({ templateUrl: 'add-edit-course.component.html' , styleUrls: ['add-edit-course.component.css']})
export class AddEditCourseComponent implements OnInit {

    @ViewChild(SectionsComponent) SectionsComponent!: SectionsComponent;

    form!: FormGroup;
    selectedFile: File | null = null;
    previewUrl: string | ArrayBuffer | null | undefined = null;

    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    creatorName = ""
    categories?: any[] 
    actualCategory ?: any
    idCat : any
    courseId ?: any



    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        public router: Router,
        private courseService: CoursesService,  
        private catService: CategoriesService,  
        private alertService: AlertService,
        private location : Location
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        
        this.catService.getAll()
            .pipe(first())
            .subscribe(category => {
                this.categories = category
            })

        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            price: [0, [Validators.required, Validators.min(0)]],
            duration: [0, [Validators.required, Validators.min(0)]],
            category : ['', Validators.required],
            sections : this.formBuilder.array([]),
            image : ['']
        });


        this.title = 'Create Course';
        if (this.id) {
            // edit mode
            
            this.title = 'Edit Course';
            this.loading = true;
            this.courseService.getById(this.id)
                .pipe(first())
                .subscribe(course => {
                    this.form.patchValue({
                        title : course.title,
                        description : course.description,
                        price : course.price,
                        duration : course.duration,
                    });
                    this.courseId = course._id
                    if (course.category){
                        this.actualCategory = course.category
                        //console.log('cat ', this.actualCategory)
                        this.idCat = this.actualCategory._id
                    }
                    if (course.creator) {
                        this.creatorName = `${course.creator.firstName} ${course.creator.lastName}`
                    }
                    if (course.sections) {
                        course.sections.forEach(section => this.addSection(section));
                    }
                    this.previewUrl = course.image
                    this.loading = false
                });
        }
    }


    get f() { return this.form.controls }
    sections(): FormArray { 
        return this.form.get('sections') as FormArray
    }

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

    openVideoPopup() {
        if (this.SectionsComponent) {
            this.SectionsComponent.mode = this.id ? 'edit' : 'create';
            this.SectionsComponent.video = this.id ? this.form.value.video : null;
        }
    }

    addSection(section: any = { title: '', videoURL: '', vidDescription: '' }) {
        this.sections().push(this.formBuilder.group({
            title: [section.title, Validators.required],
            videoURL: [section.videoURL, Validators.required],
            vidDescription: [section.vidDescription, [Validators.required]]
        }));
    }
    onVideoAdded(videoDetails: any) {
        // Ajoutez une nouvelle section avec les détails de la vidéo reçus du composant enfant
        //this.form.patchValue({ videoURL: videoDetails.videoUrl });
        this.addSection();
        const lastSectionIndex = this.sections().length - 1;
        this.sections().at(lastSectionIndex).patchValue({
            videoURL: videoDetails.videoURL,
            title : videoDetails.title,
            vidDescription : videoDetails.vidDescription
        });
    }

    removeSection(index: number) {
        this.sections().removeAt(index);
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
        const courseData = this.form.value;
        courseData.sections = JSON.stringify(this.form.value.sections) 

        const formData = new FormData();
        formData.append('title', this.form.get('title')?.value)
        formData.append('description', this.form.get('description')?.value)
        formData.append('price', this.form.get('price')?.value)
        formData.append('duration', this.form.get('duration')?.value)
        formData.append('category', this.form.get('category')?.value)
        formData.append('sections', JSON.stringify(this.form.get('sections')?.value))

        if (this.selectedFile){
            formData.append('image', this.selectedFile)
        }

        
        // create or update course based on id param
        let saveCourse;
        let message: string;
        
        if (this.id) {
            
            saveCourse = () => this.courseService.update(this.id!, formData);
            //console.log('ID cat',this.form.value.category)
            //console.log('ID cat mo',this.idCat)
            //console.log('ID course ',this.id!)
            if ( this.idCat !== this.form.value.category._id ) {
                this.catService.associate(this.form.value.category, this.courseId)
            .pipe(first())
            .subscribe(x =>{
                console.log(x)
            })} else {
            this.catService.disassociate(this.idCat, this.courseId)
            .pipe(first())
            .subscribe(x => {
                console.log(x)
            })
            }
            
            message = 'Course updated';
        } else {
            
            saveCourse = () => this.courseService.create(formData);
            
            
            message = 'Course created';
            
        }


        saveCourse()
            .pipe(first())
            .subscribe({
                next: (c) => {
                    console.log(c)
                    this.catService.associate(this.form.value.category, c._id)
                    .pipe(first())
                    .subscribe(x =>{
                    console.log(x)
                    })
                    
                    this.alertService.success(message, { keepAfterRouteChange: true });
                    
                    this.location.back();
                    
                },
                error: (error) => {
                    
                    this.alertService.error('erreur lors de l\'enregistrement',error)
                    
                    this.submitting = false
                    
                }
            });
    }

}
