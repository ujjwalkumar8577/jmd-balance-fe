import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    constructor(private errorService: ErrorService) { }

    handleError(error: any): void {
        // Handle the error here
        console.error('An error occurred:', error);
        // Set the error message in the ErrorService
        this.errorService.setError('An error occurred. Please try again later.');
    }
}