import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
  Renderer2,
} from '@angular/core';
import { menuSidebar } from '../../../core/consts/sidebar';
import { RouterLinkActive, RouterLink, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AppLoginService } from '@services/login.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    CommonModule,
    FormsModule,
  ],
  providers: [NgModel],
})
export class LayoutComponent implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  openSidebar: boolean = true;
  openMenu: boolean = true;
  menuSidebar:any = menuSidebar;
  loginService = inject(AppLoginService);
  router  = inject(Router)
  @ViewChildren('listItem') menuList!: QueryList<ElementRef<HTMLLIElement>>;

  ngOnInit() {
    this.checkScreenWidth();
    this.checkScreen();
  }

  showSubmenu(index: any) {
    // this.menuList.forEach(item => {
    //   item.nativeElement.classList.remove("showMenu");
    //  });
    //  itemEl.classList.toggle("showMenu");
  }

  showDropDown() {
    this.openMenu = !this.openMenu;
  }
  logout() {
    this.loginService.logout();
  }

  isSmallScreen: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
    this.checkScreen();
  }

  checkScreenWidth() {
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    this.isSmallScreen = screenWidth < 700;

    // Add or remove the class from the element
    if (this.isSmallScreen) {
      this.renderer.addClass(this.elementRef.nativeElement, 'sidebarWrap');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'sidebarWrap');
    }
  }
  checkScreen() {
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    this.isSmallScreen = screenWidth < 700;

    if (this.isSmallScreen) {
      this.renderer.addClass(this.elementRef.nativeElement, 'sidebarWrap');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'sidebarWrap');
    }
  }
}
