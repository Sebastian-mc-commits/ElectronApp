import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: unknown): void {
    throw "An unexpected error occurred. Please try again later."
  }
}
