import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatStepperModule,
    MatButtonModule,
    CdkStepperModule,
    MatCheckboxModule
  ],
  exports: [
    MatSlideToggleModule,
    MatCardModule,
    MatStepperModule,
    MatButtonModule,
    CdkStepperModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }
