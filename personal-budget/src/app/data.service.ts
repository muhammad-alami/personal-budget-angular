import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private budget$?: any;

  constructor(private http: HttpClient) {}

  getBudget() {
    if (!this.budget$) {
      this.budget$ = this.http
        .get('http://localhost:3000/budget')
        .pipe(shareReplay(1));
    }
    return this.budget$;
  }
}
