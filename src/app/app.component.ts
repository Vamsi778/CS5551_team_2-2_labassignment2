import { Component } from '@angular/core';
import {WeatherService} from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private weatherservice: WeatherService) { }

  title = 'Hourly weather Application';
  cityname="Kansas city";
  state="MO";
  private str1 = new String( "http://api.wunderground.com/api/4bbbc25f4f5946dd/conditions/hourly/q/" );
  private url: string;
  private message: any;
  public dataarr= new Array();
  public matrix:any [][] = new Array();
  private hasData: boolean = false;
  private hasCurrData: boolean = false;

  public sendMessage(): void {
  this.url= this.str1.concat(this.state,"/",this.cityname,".json");
    console.log('sendMessage() - url after getting city - ',this.url);
    this.weatherservice.getResponse(this.url).subscribe(res => {
      console.log("sendMessage() - response in app componet",res);
      let _error = res.includes("No cities match your search query");
      let _current_observation_display_location = res.includes("current_observation");
      this.message = JSON.parse(res);
      this.dataarr = new Array();
      this.matrix  = [];
      if (_error) {
        this.hasData=false;
        this.hasCurrData=false;
        this.message = "No cities match your search query";
      } else {
        if (_current_observation_display_location) {
          this.dataarr.push([this.message.current_observation.display_location.full]);
          this.dataarr.push([this.message.current_observation.temp_f]);
          this.dataarr.push([this.message.current_observation.temp_c]);
          this.dataarr.push([this.message.current_observation.wind_mph]);
          this.dataarr.push([this.message.current_observation.wind_string]);
          this.dataarr.push([this.message.current_observation.relative_humidity]);
          this.hasCurrData=true;
          console.log(this.dataarr.length);
          for(let i=0;i<=7;i++) {
            console.log("loop -i ", i);
            this.matrix.push([this.message.hourly_forecast[i].FCTTIME.civil,this.message.hourly_forecast[i].FCTTIME.weekday_name,this.message.hourly_forecast[i].condition,
              this.message.hourly_forecast[i].temp.english, this.message.hourly_forecast[i].feelslike.english,this.message.hourly_forecast[i].wspd.english,
              this.message.hourly_forecast[i].wdir.dir,this.message.hourly_forecast[i].wdir.degrees,this.message.hourly_forecast[i].humidity]);
              this.hasData=true;
          } console.log('matrix - ', this.matrix );
          this.message="Your weather result for "+this.cityname+" , "+ this.state;
        }else {
          this.hasData=false;
          this.hasCurrData=false;
          this.message = " We could observe a mismatch in city & state , kindly verify if the State has corresponding city or not "; 
        }
      }
    })
  }
}
