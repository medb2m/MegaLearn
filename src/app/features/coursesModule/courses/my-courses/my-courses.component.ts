import { Component, OnInit } from '@angular/core';
import { CoursesService } from '@app/_services/courses.service';
import { Course } from '@app/_models/course';
import { Router } from '@angular/router';

@Component({
    selector: 'app-my-courses',
    templateUrl: './my-courses.component.html',
    styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

    courses: Course[] = [];

    constructor(
        private coursesService: CoursesService,
        private router : Router
    ) { }

    ngOnInit() {
        this.coursesService.getEnrolledCourses().subscribe(courses => this.courses = courses);
    }
    goto(id : any){
        this.router.navigate([`/courses/details/${id}`]);
    }
}
