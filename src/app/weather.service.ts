import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }

  public getResponse(url: string){
    console.log("entering into weather service");
    return this.http
      .get(`${url}`)
      .pipe(map(res => {
          console.log("get menthod - ",res);
          let mess = JSON.stringify(res);
          return mess;
        })
      )
  }
}
