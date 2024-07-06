import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { CategoriesService } from '@app/_services';

@Component({
  selector: 'app-list-category-admin',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent {
  categories?: any[] = [];
  searchText = ''

  constructor(private catService: CategoriesService) { }

  ngOnInit() {
    this.catService.getAll()
      .pipe(first())
      .subscribe((category : any[]) => this.categories = category)
  }

  deleteCategory(id: string) {
    // console.log('le ID : ',id)
    const course = this.categories!.find(x => x._id === id);
    course.isDeleting = true;
    this.catService.delete(id)
      .pipe(first())
      .subscribe(() => {
        this.categories = this.categories!.filter(x => x._id !== id);
      });
  }
  getLen(courses: []): number {
    return courses.length
  }
}
