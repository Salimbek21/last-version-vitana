import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  // Subject emitting the breadcrumb hierarchy
  private readonly _breadcrumbs$ = new BehaviorSubject<any[]>([]);
  route = inject(ActivatedRouteSnapshot);
  // Observable exposing the breadcrumb hierarchy
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(
        // Filter the NavigationEnd events as the breadcrumb is updated only when the route reaches its end
        filter((event: any) => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        // Construct the breadcrumb hierarchy
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs: any[] = [];
        this.addBreadcrumb(root, [], breadcrumbs);

        // Emit the new hierarchy
        this._breadcrumbs$.next(breadcrumbs);
      });
  }

  private addBreadcrumb(
    route: any,
    parentUrl: string[],
    breadcrumbs: any[]
  ) {
    if (route) {
      // Construct the route URL
      const routeUrl = parentUrl.concat(route.url.map((url:any) => url.path));

      // Add an element for the current route part
      if (route.data.breadcrumb) {
        const breadcrumb = {
          label: this.getLabel(route.data),
          url: '/' + routeUrl.join('/'),
        };
        breadcrumbs.push(breadcrumb);
      }

      // Add another element for the next route part
      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }

  private getLabel(data: any) {
    // The breadcrumb can be defined as a static string or as a function to construct the breadcrumb element out of the route data
    return typeof data.breadcrumb === 'function'
      ? data.breadcrumb(data)
      : data.breadcrumb;
  }
}
