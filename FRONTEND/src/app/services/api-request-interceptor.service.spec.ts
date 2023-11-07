import { TestBed } from '@angular/core/testing';
import { ApiRequestInterceptor } from './api-request.interceptor';  

describe('ApiRequestInterceptor', () => {
  let interceptor: ApiRequestInterceptor;  

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiRequestInterceptor]  
    });
    interceptor = TestBed.inject(ApiRequestInterceptor);  
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
