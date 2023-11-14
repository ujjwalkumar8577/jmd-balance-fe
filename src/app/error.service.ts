import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  public errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor() { }

  setError(message: string): void {
    this.errorMessageSubject.next(message);
    setTimeout(() => {
      this.clearError();
    }, 2000);
  }

  clearError(): void {
    this.errorMessageSubject.next('');
  }
}
