import { Component } from '@angular/core';
import { BreadcrumbService } from '@services/breadcrumbs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  template: `<ul>
    <li *ngFor="let breadcrumb of breadcrumbs$ | async">
      <a [href]="breadcrumb.url">{{ breadcrumb.label }}</a>
    </li>
  </ul> `,
  standalone: true,
})
export class BreadcrumbComponent {
  breadcrumbs$: Observable<any[]>;

  constructor(private readonly breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }
}
