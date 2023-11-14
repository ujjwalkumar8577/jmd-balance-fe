import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from './constants'

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }

  public get(queryParams: any) {
    const url = BASE_URL + '/balance-summary?' + queryParams;
    return this.http.get(url);
  }

  public post(url: string, data: any, options?: any) {
    return this.http.post(url, data, options);
  }

  public postFormData(password: string, file: File) {
    const url = BASE_URL + '/balance-summary';
    const formData = new FormData();
    formData.append('password', password);
    formData.append('file', file, file.name);
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this.http.post(url, formData, { headers });
  }
}
