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
  totalAmount: number = 0;

  fullNamePatter: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  phonePatter: string = "[+][0-9]{10,13}";


  step1Form = this._formBuilder.group({
    name: ['Vanessa Mint', [Validators.required, Validators.pattern(this.fullNamePatter)]],
    email: ['vanessamint@', [Validators.required, Validators.pattern(this.emailPattern)]],
    phone: ['', [Validators.minLength(11), Validators.required, Validators.pattern(this.phonePatter)]],
  });

  step2Form = this._formBuilder.group({
    arcade: [true],
    advance: [false],
    pro: [false],
  });

  step3Form = this._formBuilder.group({
    onlineService: [true],
    largerStorage: [true],
    customProfile: [false],
  });
  constructor(private _formBuilder: FormBuilder) {
    // todo: erase when finish
    setTimeout(() => {
      this.stepper.selectedIndex = this.step;
    }, 100);

    this.detectDevice();
  }

  get arcadeValue() {
    return this.step2Form.controls['arcade'].value;
  }

  get advanceValue() {
    return this.step2Form.controls['advance'].value;
  }

  get proValue() {
    return this.step2Form.controls['pro'].value;
  }

  get onlineServiceValue() {
    return this.step3Form.controls['onlineService'].value;
  }

  get largerStorageValue() {
    return this.step3Form.controls['largerStorage'].value;
  }

  get customProfileValue() {
    return this.step3Form.controls['customProfile'].value;
  }

  eraseWhiteSpace(input: string) {
    this.step1Form.patchValue({
      [input]: this.step1Form.get(input)?.value.trim()
    });
  }


  selectPlan(i: number) {
    switch (i) {
      case 0:
        this.step2Form.patchValue({
          arcade: true,
          advance: false,
          pro: false,
        })
        this.totalAmountCalculation();
        break;
      case 1:
        this.step2Form.patchValue({
          arcade: false,
          advance: true,
          pro: false,
        })
        this.totalAmountCalculation();
        break;
      case 2:
        this.step2Form.patchValue({
          arcade: false,
          advance: false,
          pro: true,
        })
        this.totalAmountCalculation();
        break;

      default:
        break;
    }

  }

  selectAddOns(i: number) {
    switch (i) {
      case 0:
        this.step3Form.patchValue({
          onlineService: !this.onlineServiceValue,
        })
        this.totalAmountCalculation();
        break;
      case 1:
        this.step3Form.patchValue({
          largerStorage: !this.largerStorageValue,
        })
        this.totalAmountCalculation();
        break;
      case 2:
        this.step3Form.patchValue({
          customProfile: !this.customProfileValue,
        })
        this.totalAmountCalculation();
        break;

      default:
        break;
    }

  }


  totalAmountCalculation() {
    if (this.arcadeValue) {
      this.totalAmount = 9;
      if (this.onlineServiceValue) {
        this.totalAmount += 1;
      }
      if (this.largerStorageValue) {
        this.totalAmount += 2;
      }
      if (this.customProfileValue) {
        this.totalAmount += 2;
      }
    }

    if (this.advanceValue) {
      this.totalAmount = 12;
      if (this.onlineServiceValue) {
        this.totalAmount += 1;
      }
      if (this.largerStorageValue) {
        this.totalAmount += 2;
      }
      if (this.customProfileValue) {
        this.totalAmount += 2;
      }
    }

    if (this.proValue) {
      this.totalAmount = 15;
      if (this.onlineServiceValue) {
        this.totalAmount += 1;
      }
      if (this.largerStorageValue) {
        this.totalAmount += 2;
      }
      if (this.customProfileValue) {
        this.totalAmount += 2;
      }
    }

    if (this.periodSwitch) {
      this.totalAmount *= 10;
    }

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
    this.totalAmountCalculation();
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

