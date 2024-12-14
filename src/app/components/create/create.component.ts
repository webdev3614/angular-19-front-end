import { Component,Output,EventEmitter } from '@angular/core';
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { Doctor } from "../doctor/doctor.component";

@Component({
  selector: 'app-create',
  imports: [],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  name = ""
  qualification = ""
  image_url = ""
  description = ""
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  onChangeName(arg:any){
    this.name = arg.target.value
  }
  onChangeQualification(arg:any){
    this.qualification = arg.target.value
  }
  onChangeImageURL(arg:any){
    this.image_url = arg.target.value
  }
  onChangeDescription(arg:any){
    this.description = arg.target.value
  }
  open(content:any){
    this.modalService.open(content,{ size: 'xl' });
  }
  reset(){
    this.name = ""
    this.qualification = ""
    this.image_url = ""
    this.description = ""
  }
  save(){
    this.modalService.dismissAll()
    this.onCreate.emit({
      name:this.name,
      qualification:this.qualification,
      image_url:this.image_url,
      description:this.description,
      attr:""
    })
    this.reset()
  }
  @Output() onCreate = new EventEmitter<Doctor>()
}
