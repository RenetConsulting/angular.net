import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxMatInputModule } from '@renet-consulting/ngx-mat-input';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordEffects } from './effects';
import { changePasswordReducer } from './reducer';

@NgModule({
    declarations: [ChangePasswordComponent],
    imports: [
        CommonModule,
        ChangePasswordRoutingModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        NgxMatInputModule,
        StoreModule.forFeature('changePassword', changePasswordReducer),
        EffectsModule.forFeature([ChangePasswordEffects]),
    ],
})
export class ChangePasswordModule { }
