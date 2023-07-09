import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { HotToastModule } from '@ngneat/hot-toast';
import { LayoutComponent } from '@components/layout/layout.component';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
class AppModule {}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    FormsModule,
    LayoutComponent,
    HotToastModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppComponent implements OnInit {

  ngOnInit() {}

}
