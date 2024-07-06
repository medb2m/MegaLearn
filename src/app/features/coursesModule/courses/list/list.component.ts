import { Component } from '@angular/core';
import { CoursesService } from '@app/_services/courses.service';
import { Course } from '@app/_models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, CategoriesService } from '@app/_services';
import { BehaviorSubject, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  courses: Course[] = []
  filteredCourses: Course[] = [];
  priceFilter: number | undefined ;
  sortOrder: string = '';
  categoryFilter: string = '';
  categories: any[] = [];

  private filterCriteria$ = new BehaviorSubject<{ priceFilter?: number, sortOrder: string, categoryFilter: string }>({ sortOrder: '', categoryFilter: '' });

  constructor(
    private coursesService: CoursesService,
    private categoriesService: CategoriesService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // this.coursesService.getAll().subscribe(courses => this.courses = courses);
   /*  this.route.queryParams.subscribe(params => {
      const searchTerm = params['search'];
      if (searchTerm) {
        this.coursesService.searchCourses(searchTerm).subscribe(courses => {
          this.courses = courses;
          this.filterAndSortCourses();
        });
      } else {
        this.coursesService.getAll().subscribe(courses => {
          this.courses = courses;
          this.filterAndSortCourses();
        });
      }
    });  */

     this.route.queryParams.pipe(
      switchMap(params => {
        const searchTerm = params['search'];
        if (searchTerm) {
          return this.coursesService.searchCourses(searchTerm);
        } else {
          return this.coursesService.getAll();
        }
      }),
      map(courses => {
        this.courses = courses;
        this.categories = [...new Set(courses.map(course => course.category))];
        return courses;
      })
    ).subscribe(courses => {
      this.filterAndSortCourses();
    });

    this.filterCriteria$.subscribe(() => {
      this.filterAndSortCourses();
    }); 
  }



  discount(price: any) {
    price *= 0.1
    return price.toFixed(2)
  }

  enroll(courseId: string | undefined) {
    if (courseId) {
      this.coursesService.enrollInCourse(courseId).subscribe(
        response => {
          // Affichez une alerte de succès
          this.alertService.success('Enrolled successfully');

          // Redirigez l'utilisateur vers le chemin souhaité
          this.router.navigate(['/courses/mycourses']);
        },
        error => {
          // Affichez une alerte d'erreur
          this.alertService.error('Enrollment failed');
          console.error('Enrollment failed', error);
        }
      );
    } else {
      console.error('Course ID is undefined');
    }
  }

  proceedToPayment(courseId: string | undefined) {
    if (courseId) {
      this.router.navigate(['/pay/method'], { queryParams: { courseId: courseId } });
    } else {
      console.error('Course ID is undefined');
    }
  }


  goto(id: any) {
    this.router.navigate([`/courses/details/${id}`]);
  }

  filterAndSortCourses() {
    /* console.log(this.priceFilter)
    console.log(this.sortOrder)
    this.filteredCourses = this.courses.filter(course => {
      return this.priceFilter ? course.price <= this.priceFilter : true;
    });

    if (this.sortOrder === 'asc') {
      this.filteredCourses.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'desc') {
      this.filteredCourses.sort((a, b) => b.price - a.price);
    } */

    /** */
    console.log('Filtering and sorting courses...');
    let courses = [...this.courses];
    if (this.priceFilter !== undefined) {
      let x = this.priceFilter
      courses = courses.filter(course => this.discount(course.price) <= x )
    }
    if (this.categoryFilter) {
      courses = courses.filter(course => course.category.name === this.categoryFilter);
    }
    if (this.sortOrder === 'asc') {
      courses.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'desc') {
      courses.sort((a, b) => b.price - a.price);
    }

    this.filteredCourses = courses; 
  }
  onPriceFilterChange() {
    console.log('Price filter changed:', this.priceFilter);
    this.filterCriteria$.next({ priceFilter: this.priceFilter, sortOrder: this.sortOrder, categoryFilter: this.categoryFilter });
  }

  onSortOrderChange() {
    console.log('Sort order changed:', this.sortOrder);
    this.filterCriteria$.next({ priceFilter: this.priceFilter, sortOrder: this.sortOrder, categoryFilter: this.categoryFilter });
  }

  onCategoryFilterChange() {
    console.log('Category filter changed:', this.categoryFilter);
    this.filterCriteria$.next({ priceFilter: this.priceFilter, sortOrder: this.sortOrder, categoryFilter: this.categoryFilter });
  }

}
