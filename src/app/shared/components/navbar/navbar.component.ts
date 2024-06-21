import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Account, Course, Role } from '@app/_models';
import { AccountService, CoursesService } from '@app/_services';


@Component({ selector: 'app-navbar', templateUrl: 'navbar.component.html', styleUrls : ['navbar.component.css']})
export class NavbarComponent {
    Role = Role;
    account?: Account | null;
    searchResults: Course[] = [];
    showSuggestions: boolean = false;
    
    constructor(
        private accountService: AccountService,
        private router: Router,
        private coursesService: CoursesService 
    ) { }

    ngOnInit() {
        this.accountService.account.subscribe(x => this.account = x);
    }

    logout() {
        this.accountService.logout();
    }

    onSearch(searchTerm: string) {
      
        this.router.navigate(['/courses/'], { queryParams: { search: searchTerm } });
        this.showSuggestions = false
      }

      onSearchInput(searchTerm: string) {
        if (searchTerm.length >= 2) {
          this.coursesService.searchCourses(searchTerm).subscribe(
            courses => {
                this.searchResults = courses
                this.showSuggestions = true
            }
          );
        } else {
          this.searchResults = [];
          this.showSuggestions = false
        }
      }

      selectSuggestion(course: Course) {
        this.router.navigate([`/courses/details/${course._id}`]);
        this.showSuggestions = false; // Hide suggestions after selecting one
      }
}