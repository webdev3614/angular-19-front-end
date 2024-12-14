import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

interface Weather {
  datetime: string,
  weather: string,
  temperature: number,
  humidity: number,
  min_temperature: number,
  max_temperature: number
}

@Component({
  selector: 'app-forecast',
  imports: [DecimalPipe],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css',
  providers: []
})

export class ForecastComponent {
  @Input() forecastData: Array<Weather> = [];
}
