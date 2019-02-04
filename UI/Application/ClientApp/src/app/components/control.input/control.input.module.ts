import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { ValidatorModule } from "../../directives/validator/validator.module";
import { ControlInputComponent } from "./control.input.component";

const MODULES = [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    ValidatorModule
]

const COMPONENTS = [
    ControlInputComponent
]

@NgModule({
    imports: [
        ...MODULES
    ],
    exports: [
        ...COMPONENTS
    ],
    declarations: [
        ...COMPONENTS
    ]
})
export class ControlInputModule { }