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
    this.http.post(this.serverUrl + endpoint, body)
      .subscribe({
        next: (res: any) => {
          console.log("backend response",res)
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }

  genericGet(endpoint: string){
    return this.http.get(this.serverUrl+endpoint)
  }
}
