import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('request coming here');
  const token = localStorage.getItem('token');
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: token
    }
  });
  console.log(clonedRequest);
  return next(clonedRequest);
};
