import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { CdkStepper, StepperOrientation } from '@angular/cdk/stepper';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: CdkStepper }],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('stepper') stepper!: MatStepper;
  step: number = 1;
  title = 'fm-multi-step-form';
  periodSwitch: boolean = false;
  step1Form;
  fadeOut: boolean = false;
  ele0: any;
  ele1: any;
  ele2: any;
  ele3: any;
  click0: any;
  click1: any;
  click2: any;
  click3: any;
  finished: boolean = false;
  orientationStepper: StepperOrientation = 'vertical'
  isMobile: boolean = false;
  onlineService: boolean = true;
  largerStorage: boolean = true;
  customProfile: boolean = false;

  constructor() {
    this.step1Form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });
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

  ngAfterViewInit() {
    console.log('ngAfterViewInit is triggered');
    this.fadeOut = false;
    let elements = document.querySelectorAll('mat-step-header');
    if (elements) {
      elements.forEach((e, i) => {
        // console.log('e', i, ': ', e);
        if (i === 0) {
          this.ele0 = e;
          this.click0 = e.addEventListener('click', () => this.changeStep(i));
        }
        else if (i === 1) {
          this.ele1 = e;
          this.click1 = e.addEventListener('click', () => this.changeStep(i));
        }
        else if (i === 2) {
          this.ele2 = e;
          this.click2 = e.addEventListener('click', () => this.changeStep(i));
        }
        else if (i === 3) {
          this.ele3 = e;
          this.click3 = e.addEventListener('click', () => this.changeStep(i));
        }
      })
    }
  }

  finishSuscription() {
    this.finished = true;
  }

}

