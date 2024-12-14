import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Doctor } from '../doctor/doctor.component';

@Component({
  selector: 'app-appt',
  imports: [],
  templateUrl: './appt.component.html',
  styleUrl: './appt.component.css'
})
export class ApptComponent {
  times = {
    morning:[
      "09:00 AM",
      "09:15 AM",
      "09:30 AM",
      "09:45 AM",
      "10:00 AM",
      "10:15 AM",
      "10:30 AM",
      "10:45 AM",
      "11:00 AM",
      "11:15 AM",
      "11:30 AM",
      "11:45 AM",
    ],
    afternoon:[
      "1:30 PM",
      "1:45 PM",
      "2:00 PM",
      "2:15 PM",
      "2:30 PM",
      "2:45 PM",
      "3:00 PM",
      "3:15 PM",
      "3:30 PM",
      "3:45 PM",
      "4:00 PM",
      "4:15 PM",
    ],
    evening:[
      "5:00 PM",
      "5:15 PM",
      "5:30 PM",
      "5:45 PM",
      "6:00 PM",
      "6:15 PM",
      "6:30 PM",
      "6:45 PM",
      "7:00 PM",
      "7:15 PM",
      "7:30 PM",
      "7:45 PM",
    ]
  }
  @Input() doctor:Doctor = {
    name:"",
    qualification:"",
    image_url:"",
    description:"",
    attr:""
  }
  setAttr(arg:string){
    this.onSet.emit(arg)
  }
  bookAppointment(){
    this.onBook.emit("save")
  }
  @Output() onSet = new EventEmitter<string>()
  @Output() onBook = new EventEmitter<string>()
}
