import { Component, inject, OnInit } from '@angular/core';
import { ClassService } from './dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.scss'],
  providers: [ClassService],
})
export class DashboardComponent implements OnInit {
  data: any[] = [];

  classTableService = inject(ClassService);

  ngOnInit(): void {}
}
