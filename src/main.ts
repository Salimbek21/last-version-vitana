import { enableProdMode, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app.routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from 'app/core/interceptors/auth.interceptor';
import { environment } from 'environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    importProvidersFrom(
      CommonModule,
      BrowserModule,
      NgbModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule
    ),
  ],
}).catch((err) => console.error(err));
