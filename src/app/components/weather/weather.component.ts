import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { DataService } from "../../script/data.service";
import { HttpClient } from '@angular/common/http';
import { ForecastComponent } from "../forecast/forecast.component";

@Component({
  selector: 'app-weather',
  imports: [ForecastComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
  providers: [NgbModalConfig, NgbModal]
})
export class WeatherComponent implements OnInit {
  weather = {
    datetime:"20/01/70 8:42:33 PM UTC-330:00",
    weather: "Rain",
    temperature: 24,
    humidity: 50,
    min_temperature: 17,
    max_temperature: 24
  }
  forecast = []
  API_KEY = "586b0b787977426cbeb0b397d8ca9943"

  cityData = {
    name: "Nodia",
    lat: 0,
    lon: 0
  }

  constructor(
    private http: HttpClient,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.showWeather((data: any) => {
      this.weather = this.getWeather(data)
      console.log(this.weather)
    })
  }
  getDateTime(dateTime: any) {
    const now = new Date(dateTime.time);

    // Get the current date components
    const day = String(now.getDate()).padStart(2, '0');  // Ensure 2-digit day
    const month = String(now.getMonth() + 1).padStart(2, '0');  // Month is 0-based, so add 1
    const year = String(now.getFullYear()).slice(-2);  // Get last two digits of the year

    // Get the time components
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Convert to 12-hour format and determine AM/PM
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;  // Convert to 12-hour format, handle 0 as 12

    // Format the time as "h:m:AM|PM"
    const timeFormatted = `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${period}`;

    // Get timezone offset in hours and minutes
    const timezoneOffset = dateTime.timezone;
    const timezoneOffsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
    const timezoneOffsetMinutes = Math.abs(timezoneOffset) % 60;
    const timezoneFormatted = `UTC${timezoneOffset < 0 ? '+' : '-'}${String(timezoneOffsetHours).padStart(2, '0')}:${String(timezoneOffsetMinutes).padStart(2, '0')}`;

    // Combine everything into the desired format
    const formattedDateTime = `${day}/${month}/${year} ${timeFormatted} ${timezoneFormatted}`;

    return formattedDateTime
  }
  getWeather(data: any) {
    return {
      datetime: data.dt_txt,
      weather: data.weather.length > 0 ? data.weather[0].description : "",
      temperature: Math.round(data.main.temp - 273),
      humidity: data.main.humidity,
      min_temperature: Math.round(data.main.temp_min - 273),
      max_temperature: Math.round(data.main.temp_max - 273)
    }
  }
  open(content: any) {
    this.showForecast((data: any) => {
      console.log(data)
      this.forecast = data.list.map((item: any) => {
        return this.getWeather(item)
      })
      this.modalService.open(content,{ size: 'xl' });
    })
  }
  showWeather(callback: any) {
    let api = `http://api.openweathermap.org/geo/1.0/direct?q=Noida,Uttar Pradesh,IN&limit=1&appid=${this.API_KEY}`
    new DataService(this.http).getData(api).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.cityData = {
            name: data[0].name,
            lat: data[0].lat,
            lon: data[0].lon
          }
          api = `https://api.openweathermap.org/data/2.5/weather?lat=${this.cityData.lat}&lon=${this.cityData.lon}&cnt=5&appid=${this.API_KEY}`
          new DataService(this.http).getData(api).subscribe({
            next: (data) => {
              callback(data)
            },
            error: (error) => {
              console.error('Error fetching city data:', error); // Handle error if API fails
            }
          });
        }
      },
      error: (error) => {
        console.error('Error fetching city data:', error); // Handle error if API fails
      }
    });
  }
  showForecast(callback: any) {
    let api = `http://api.openweathermap.org/geo/1.0/direct?q=Noida,Uttar Pradesh,IN&limit=1&appid=${this.API_KEY}`
    new DataService(this.http).getData(api).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.cityData = {
            name: data[0].name,
            lat: data[0].lat,
            lon: data[0].lon
          }
          api = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.cityData.lat}&lon=${this.cityData.lon}&appid=${this.API_KEY}`
          new DataService(this.http).getData(api).subscribe({
            next: (data) => {
              callback(data)
            },
            error: (error) => {
              console.error('Error fetching city data:', error); // Handle error if API fails
            }
          });
        }
      },
      error: (error) => {
        console.error('Error fetching city data:', error); // Handle error if API fails
      }
    });
  }
}
