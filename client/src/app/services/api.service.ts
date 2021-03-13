import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ObservableInput, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) { }

  get<T>(url: string){
    const uri: string = `${this.baseUrl}/${url}`;

    const headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.auth.getToken()}`
    });

    return this.http.get<T>(uri, {headers: headers})
      .pipe(catchError(this.handleError));
  }

  post<T>(url: string, body: Object){
    const uri: string = `${this.baseUrl}/${url}`;

    const headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.auth.getToken()}`
    });

    return this.http.post<T>(uri, body, {headers})
      .pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse): ObservableInput<any>{
    const error = {
      statusCode: err.status,
      error: err.error,
    };
    console.error(error);
    return throwError(error);
  }

}
