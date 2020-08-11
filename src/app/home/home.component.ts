import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  covidForm = this._fb.group({
    f_Name: ['', Validators.required],
    l_Name: ['', Validators.required],
    dob: ['', Validators.required],
    gender: [''],
    email: [''],
    mobile: [''],
    race: [''],
    photoId: [''],
    insuranceId: [''],
    travel: [''],
    contactWithSuspect: [''],
    isSwabTestDone: [''],
    isAntibodyTestDone: [''],
    address: this._fb.group({
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    insurance: this._fb.group({
      type: [''],
      id: [''],
      group: [''],
      name: [''],
      relation: [''],
    }),
  });
  covidTest = this._fb.group({
    date: [''],
    labName: [''],
    result: [''],
  });
  antiBodyTest = this._fb.group({
    date: [''],
    labName: [''],
    antibodies: [''],
    result: [''],
  });

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
  //  this.addControls();
  this.covidForm.valueChanges.subscribe(x => {
    if(x.isAntibodyTestDone !=''){
      this.addControlsAntiswab(x.isAntibodyTestDone);
    }
    if(x.isSwabTestDone !=''){
      this.addControlsCovid(x.isSwabTestDone);
    }
})

  }

  onSubmit() {
    console.table(this.covidForm.value);
  }

  setValue(data, control) {
    this.covidForm.controls[control].setValue(data);
  }
  addControlsCovid(x){
    if(x=='1'){
      this.covidForm.addControl('covidTest',this.covidTest);
    }else{
      this.covidForm.removeControl('covidTest');
    }
  }
  addControlsAntiswab(x){
    if(x=='1'){
       this.covidForm.addControl('antiBodyTest',this.antiBodyTest);
    }else{
      this.covidForm.removeControl('antiBodyTest');
    }
  }

  get isSwabTestDone() { return this.covidForm.get('isSwabTestDone').value; }

  get isAntibodyTestDone() { return this.covidForm.get('isAntibodyTestDone').value; }

  get form() {
    console.log("logss",this.covidForm.controls)
    return this.covidForm.controls;
  }

}
