import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreateComponent } from "../create/create.component";

export interface Doctor {
  name: string,
  qualification: string,
  image_url: string,
  description: string,
  attr:string
}

@Component({
  selector: 'app-doctor',
  imports: [CreateComponent],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit {
  doctors: Doctor[] = []
  ngOnInit(): void {
    const preDoctors = window.localStorage.getItem("doctors");
    if(preDoctors){
      this.doctors = JSON.parse(preDoctors)
    }
  }
  createDoctor(data: Doctor) {
    this.doctors.push(data)
    this.resetStorage()
  }
  deleteDoctor(data: Doctor) {
    this.doctors = this.doctors.filter((doctor) => {
      return doctor.name !== data.name
    })
    this.resetStorage()
  }
  resetStorage(){
    window.localStorage.setItem("doctors",JSON.stringify(this.doctors))
  }
  selectDoctor(data:Doctor){
    this.onSelect.emit(data)
  }
  setDoctor(data:Doctor){
    this.doctors = this.doctors.map((doctor:Doctor)=>{
      if(doctor.name === data.name){
        return data
      }
      return doctor
    })
    this.resetStorage()
  }
  @Output() onSelect = new EventEmitter<Doctor>()
}
