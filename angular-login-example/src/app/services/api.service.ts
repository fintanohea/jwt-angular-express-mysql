import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseUrl = 'http://localhost:4000/'

  constructor(private http: HttpClient) {
  }

  getTypeRequest(url) {
    return this.http.get(`${this.baseUrl}${url}`).pipe(map(res => {
      return res
    }))
  }

  postTypeRequest(url, payload) {
    return this.http.post(`${this.baseUrl}${url}`, payload).pipe(map(res => {
      return res
    }))
  }

  putTypeRequest(url, payload) {
    return this.http.put(`${this.baseUrl}${url}`, payload).pipe(map(res => {
      return res
    }))
  }
}