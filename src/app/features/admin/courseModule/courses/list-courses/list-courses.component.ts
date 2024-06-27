import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { CategoriesService, CoursesService } from '@app/_services';
import { Category } from '@app/_models/category';
import { Course } from '@app/_models';
import { Router } from '@angular/router';

@Component({
  selector: 'list-course',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})
export class ListCourseComponent {
  courses?: any[];
  categories?: Category[]
  searchText = ''

  constructor(
    private courseService: CoursesService,
    private catService: CategoriesService,
    private router : Router
  ) { }

  ngOnInit() {
    this.courseService.getAll()
      .pipe(first())
      .subscribe(courses => {
        this.courses = courses
        this.courses.forEach(x => {
          this.categories?.push(x.category)
        })
      });
    this.catService.getAll()
      .pipe(first())
      .subscribe(categories => {
        this.categories = categories
      })
  }

  deleteCourse(coursev: Course) {
    console.log('le ID : ', coursev._id)
    const course = this.courses!.find(x => x._id === coursev._id);
    course.isDeleting = true;
    console.log(course._id)
    this.catService.disassociate(course.category, course._id)
      .pipe(first())
      .subscribe()
    this.courseService.delete(course._id)
      .pipe(first())
      .subscribe(() => {
        this.courses = this.courses!.filter(x => x._id !== course._id);
      });

  }

  getCat(id: string): string {
    let aux
    this.categories?.find(cat => {
      if (cat._id === id) {
        aux = cat.name
      }
    })
    return aux || "No Category"
  }

  createQuiz(courseId: string) {
    console.log('courseId '+courseId)
      this.router.navigate(['/admin/quiz/add'], { queryParams: { courseId: courseId } });
    
  }
  
  goto(path : any){
    this.router.navigate([`admin/courses/editCourse/${path}`])
  }
}
