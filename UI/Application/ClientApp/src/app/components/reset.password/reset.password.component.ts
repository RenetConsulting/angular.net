import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { IResetPassword } from "../../interfaces/reset.password";
import { AccountService } from "../../services/account/account.service";
import { MessageHandlerService } from "../../services/message.handler/message.handler.service";

@Component({
    selector: "reset-password",
    templateUrl: "./reset.password.component.html",
    styleUrls: ["./reset.password.component.scss"]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

    readonly subscription = new Subscription();
    formGroup: FormGroup;

    constructor(
        @Inject(AccountService) private accountService: AccountService,
        @Inject(MessageHandlerService) private messageHandlerService: MessageHandlerService,
        @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.setFormGroup();
        this.subscription.add(this.activatedRoute.queryParams.subscribe(i => this.formGroup.controls.token.reset(i['token'])));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    matchPasswordValidator = (control: AbstractControl): ValidationErrors | null => {
        return control.value !== (this.formGroup && this.formGroup.controls.password.value) ? { errorMessage: `Doesn't match with Password.` } : null;
    }

    setFormGroup = (): void => {
        this.formGroup = new FormGroup(<MapPick<IResetPassword, keyof IResetPassword, FormControl>>{
            email: new FormControl("", [Validators.required, Validators.minLength(6), Validators.email]),
            password: new FormControl("", [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl("", [Validators.required, Validators.minLength(6), this.matchPasswordValidator]),
            token: new FormControl("", [Validators.required]),
        });
    }

    submit = (): void => {
        if (this.formGroup.valid) {
            this.accountService.resetPassword(this.formGroup.value)
                .pipe(
                    tap(() => this.formGroup.reset()))
                .subscribe(() => this.messageHandlerService.handleSuccess("The password has been changed successfully."));
        }
    }
}
