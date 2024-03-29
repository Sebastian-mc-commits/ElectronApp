import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CustomErrorHandlerService } from './services/custom-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), {
    provide: ErrorHandler, useClass: CustomErrorHandlerService
  }]
};
