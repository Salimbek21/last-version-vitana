import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable()

export class ClassService {
  private http$ = inject(HttpClient);


}
