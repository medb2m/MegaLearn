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
<<<<<<< Updated upstream
=======

    @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-container')) {
      this.showSuggestions = false;
      this.clearSearchInput();
    }

    if (this.isSmallScreen && !target.closest('.navbar') && !target.closest('.navbar-toggler')) {
      this.closeNavbar();
    }
  }

  closeNavbar() {
    if (this.navbarCollapse) {
      const navbar = this.navbarCollapse.nativeElement;
      if (navbar.classList.contains('show')) {
        navbar.classList.remove('show');
      }
    }
    
  }

  // Method to clear the search input
  clearSearchInput() {
    if (this.searchInput)
    this.searchInput.nativeElement.value = '';
  }

  // Method to stop propagation of click events inside the search container
  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  }
>>>>>>> Stashed changes
}