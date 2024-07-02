import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '@app/_services';
import { PostService } from '@app/_services/post.service';
import { Post } from '@app/_models/post';

@Component({templateUrl: 'add-edit-post.component.html' , styleUrls: ['add-edit-post.component.css']})
export class AddEditPostComponent implements OnInit {

    // Form decla
    form!: FormGroup

    // Image_Attribut 
    selectedFile: File | null = null
    previewUrl: string | ArrayBuffer | null | undefined = null

    id?: string
    title!: string
    loading = false
    submitting = false
    submitted = false
    attributType = ''
    postId ?: any



    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        public router: Router,
        private postService: PostService,    
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            content: ['', [Validators.required, Validators.minLength(6)]],
            image : [''],
        });


        this.title = 'Create Post'
        if (this.id) {
            // edit mode
            
            this.title = 'Edit Post';
            this.loading = true;
            this.postService.getPostById(this.id)
                .pipe(first())
                .subscribe((post : Post) => {
                    this.form.patchValue({
                        title : post.title,
                        content : post.content,
                    });
                    this.postId = post._id
                    this.previewUrl = post.image
                    console.log('image ' + post.image)
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
        formData.append('title', this.form.get('title')?.value)
        formData.append('content', this.form.get('content')?.value)
        console.log('formdata ' + formData.get('title') )

        // add image if selected
        if (this.selectedFile){
            formData.append('image', this.selectedFile)
        }

        
        // create or update course based on id param
        let saveModel;
        let message: string;
        
        if (this.id) {
            saveModel = () => this.postService.updatePost(this.postId, formData);
            message = 'Post updated';
        } else {
            saveModel = () => this.postService.createPost(formData);
            message = 'Post created';
        }


        saveModel()
            .pipe(first())
            .subscribe({
                next: () => {            
                    this.alertService.success(message, { keepAfterRouteChange: true });
                    this.router.navigateByUrl('admin/blog');
                },
                error: (error) => {
                    this.alertService.error(error)
                    this.submitting = false
                }
            });
    }
}
