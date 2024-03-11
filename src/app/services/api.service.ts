import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) {
  }

  genericPost(endpoint: any, body: any) {
    return this.http.post(this.serverUrl + endpoint, body)
  }

  genericGet(endpoint: string){
    return this.http.get(this.serverUrl+endpoint)
  }

  genericDelete(endpoint: string){
    return this.http.delete(this.serverUrl+endpoint)
  }
}
