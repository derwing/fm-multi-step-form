import { AfterContentChecked, AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { CdkStepper, StepperOrientation } from '@angular/cdk/stepper';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: CdkStepper }],
})
export class AppComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  step: number = 0;
  title = 'fm-multi-step-form';
  periodSwitch: boolean = false;
  finished: boolean = false;
  orientationStepper: StepperOrientation = 'vertical'
  isMobile: boolean = false;
  onlineService: boolean = true;
  largerStorage: boolean = true;
  customProfile: boolean = false;

  fullNamePatter: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  step1Form = this._formBuilder.group({
    name: ['Vanessa Mint', [Validators.required, Validators.pattern(this.fullNamePatter)]],
    email: ['vanessamint@', [Validators.required, Validators.pattern(this.emailPattern)]],
    phone: ['', Validators.required],
  });

  step2Form = this._formBuilder.group({
    arcade: [false],
    advance: [false],
    pro: [false],
  });
  constructor(private _formBuilder: FormBuilder) {
    // todo: erase when finish
    setTimeout(() => {
      this.stepper.selectedIndex = this.step;
    }, 100);

    this.detectDevice();
  }

  detectDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // true for mobile device
      this.isMobile = true;
      this.orientationStepper = 'horizontal';
    }

  }

  changeStep(index: number) {

    this.step = index;
    this.stepper.selectedIndex = this.step;

  }

  nextStep() {
    this.stepper.selectedIndex = this.stepper._getFocusIndex()! + 1;
    this.step = this.stepper._getFocusIndex()!;
  }

  backStep() {
    this.stepper.selectedIndex = this.stepper._getFocusIndex()! - 1;
    this.step = this.stepper._getFocusIndex()!;
  }

  finishSuscription() {
    this.finished = true;
  }


}

