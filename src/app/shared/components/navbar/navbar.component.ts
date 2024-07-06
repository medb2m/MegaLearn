import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Account, Course, Role } from '@app/_models';
import { AccountService, CoursesService, DiscountTimerService, ScreenSizeService } from '@app/_services';
import { Observable } from 'rxjs';


@Component({ selector: 'app-navbar', templateUrl: 'navbar.component.html', styleUrls : ['navbar.component.css']})
export class NavbarComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;

    Role = Role;
    account?: Account | null;
    searchResults: Course[] = [];
    showSuggestions: boolean = false;
    isSmallScreen : boolean = false

    timeLeft$: Observable<number>;
    
    constructor(
        private accountService: AccountService,
        private router: Router,
        private coursesService: CoursesService,
        private screenSizeService : ScreenSizeService,
        private discountTimerService: DiscountTimerService 
    ) {this.timeLeft$ = this.discountTimerService.timeLeft; }

    ngOnInit() {
      
        this.accountService.account.subscribe(x => this.account = x);
        this.screenSizeService.isSmallScreen().subscribe(isSmall => {
          this.isSmallScreen = isSmall
          console.log(isSmall)
        })
    }

    logout() {
        this.accountService.logout();
    }

    onSearch(searchTerm: string) {
      console.log('hello ' + searchTerm)
        this.router.navigate(['/courses'], { queryParams: { search: searchTerm } });
        this.showSuggestions = false
        this.closeNavbar()
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
        this.closeNavbar()
        this.router.navigate([`/courses/details/${course._id}`]);
        this.showSuggestions = false; // Hide suggestions after selecting one
        
      }

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
    const navbar = this.navbarCollapse.nativeElement;
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }

  // Method to clear the search input
  clearSearchInput() {
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
}