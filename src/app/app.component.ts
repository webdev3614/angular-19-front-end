import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from "./components/title/title.component";
import { Doctor, DoctorComponent } from "./components/doctor/doctor.component";
import { ApptComponent } from "./components/appt/appt.component";
import { CommonModule } from '@angular/common';
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TitleComponent, DoctorComponent, ApptComponent, NgbModalModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  @ViewChild(DoctorComponent) docterCom: DoctorComponent | undefined
  doctor: Doctor = {
    name: "",
    qualification: "",
    image_url: "",
    description: "",
    attr: ""
  }
  selectDoctor(arg: Doctor) {
    this.doctor = arg
  }
  setAttr(arg: string) {
    this.doctor = {
      ...this.doctor,
      attr: arg
    }
  }
  bookAppointment() {
    if(this.docterCom){
      this.docterCom.setDoctor(this.doctor)
    }
  }
}
