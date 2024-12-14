import { Component, OnInit } from '@angular/core';
import { WeatherComponent } from "../weather/weather.component";

@Component({
  selector: 'app-title',
  imports: [WeatherComponent],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})

export class TitleComponent implements OnInit {
  time = this.getDateTime()
  ngOnInit(): void {
    setInterval(() => {
      this.time = this.getDateTime()
    }, 1);
  }
  getDateTime() {
    const now = new Date();
  
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
  
    return timeFormatted
  }
}
