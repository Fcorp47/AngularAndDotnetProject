import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:5210/api/JsonData';

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(this.apiUrl);
  }

  saveData(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
