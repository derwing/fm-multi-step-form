import { Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { CdkStepper } from '@angular/cdk/stepper';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: CdkStepper }],
})
export class AppComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  step: number = 2;
  title = 'fm-multi-step-form';
  periodSwitch: boolean = false;
  step1Form;

  constructor() {
    this.step1Form = new FormGroup({
      name: new FormControl('Vanessa Mint', Validators.required),
      email: new FormControl('vanessamint@', Validators.required),
      phone: new FormControl('', Validators.required)
    });
    // todo: erase when finish
    setTimeout(() => {
      this.stepper.selectedIndex = this.step;
    }, 100);
  }

  changeStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.stepper.selectedIndex = this.stepper._getFocusIndex()! + 1;
    this.step = this.stepper._getFocusIndex()!;
  }

  backStep() {
    this.stepper.selectedIndex = this.stepper._getFocusIndex()! - 1;
    this.step = this.stepper._getFocusIndex()!;
  }

}

