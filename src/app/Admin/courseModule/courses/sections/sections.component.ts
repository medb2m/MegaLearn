import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@app/_services';
import { VideosService } from '@app/_services/video.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent {
  @Output() videoAdded = new EventEmitter<any>()
  @Input() mode!: 'create' | 'edit';
  @Input() video?: any;

  videoForm!: FormGroup;
  submitted = false;
  submitting = false;
  selectedFile: File | null = null;
  url : string = ''

  constructor(
    private formBuilder: FormBuilder, 
    private videoService: VideosService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.videoForm = this.formBuilder.group({
      title: ['', Validators.required],
      vidDescription: ['', [Validators.required]],
      url: [null, Validators.required],
    });

    if (this.mode === 'edit' && this.video) {
      // Populate form with existing video data if editing
      this.videoForm.patchValue({
        title: this.video.title,
        vidDescription: this.video.vidDescription,
      })
      console.log('edit')
    }
  }

  get f() { return this.videoForm.controls; }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.videoForm.patchValue({
        video: this.selectedFile,
      });
    }
  }

  onSubmit() {
    this.submitted = true

    if (this.videoForm.invalid || !this.selectedFile) {
      return;
    }

    this.submitting = true

    const formData = new FormData()
    formData.append('url', this.selectedFile)
    formData.append('title',this.videoForm.value.title)
    formData.append('vidDescription',this.videoForm.value.vidDescription)

    this.videoService.uploadVideo(formData).subscribe({
      next: (response) => {
        // Handle successful upload, e.g., update the course form with video URL
        this.videoAdded.emit({
          videoURL : response.url,
          title : this.videoForm.get('title')?.value,
          vidDescription : this.videoForm.get('vidDescription')?.value,
        })
        this.url = response.url
        //console.log(response.url)
        this.submitting = false;
        this.submitted = false;
        this.videoForm.reset()
        this.selectedFile = null
        
        this.close()
      },
      error: (error) => {
        // Handle error
        this.submitting = false;
        this.close()
        this.alertService.error(error)
        console.log('err ',error)
      }
    });
  }

  close() {
    // Logic to close the modal, if needed
    const modal = document.getElementById('videoModal');
    if (modal) {
      modal.click();}
  }
}
