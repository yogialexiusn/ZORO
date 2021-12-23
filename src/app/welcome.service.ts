import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, filter } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
// import { UrlServices } from '../../service/url-service';
import { RequestOptions, ResponseContentType, Http, Headers } from '@angular/http';
import { Model } from './pages/welcome/Model';


@Injectable({ providedIn: 'root' })
export class WelcomeService {
  
  constructor(private httpClient: HttpClient, private http: Http) { }
  test: any;
  
  public getDetailTask(): Observable<any> {
    return new Observable((observer) => {
      this.httpClient.get('/api/perceptions')
        .subscribe(response => {
          observer.next(response);
        },
          error => {
            observer.error(error);
          });
    });
  }

  public sendtoSGS(raw: any): Observable<any> {
    return new Observable((observer) => {
      this.httpClient.post('/api/express/pickupService/exceptionMdf', raw)
        .subscribe(response => {
          console.log(" responsenya: " + JSON.stringify(response));
          observer.next(response);
        },
          error => {
            observer.error(error);
          });
    });
  }
  
  

}
