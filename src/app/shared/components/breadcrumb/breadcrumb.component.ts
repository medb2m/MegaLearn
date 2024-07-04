import { Component} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({ selector: 'app-breadcrumb', templateUrl: 'breadcrumb.component.html', styleUrls : ['breadcrumb.component.css']})
export class BreadcrumbComponent {
  breadcrumbs: Breadcrumb[] = [];
  pageTitle!: string;
  showBreadcrumbs: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.buildBreadcrumbs(this.activatedRoute.root))
    ).subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
      this.pageTitle = breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].label : '';
    });
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Check if the current route is '/' or '/home'
      this.showBreadcrumbs = !(event.url === '/' || event.url === '/home');
      this.showBreadcrumbs = !(event.url === '/account' || event.url === '/account/login');
    });

  }

  buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const breadcrumb = child.snapshot.data['breadcrumb'];
      const skipBreadcrumb = child.snapshot.data['skipBreadcrumb'];

      if (breadcrumb && !skipBreadcrumb) {
        breadcrumbs.push({ label: breadcrumb, url });
      }

      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}