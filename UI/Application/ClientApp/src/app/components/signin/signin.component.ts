import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaxLengthBase } from '../../bases/max.length/max.length.base';
import { IUser } from '../../interfaces/user';
import { AuthorizationService } from '../../services/authorization/authorization.service';

@Component({
    selector: 'signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent extends MaxLengthBase implements OnInit {

    formGroup: FormGroup;

    constructor(
        @Inject(AuthorizationService) private authorizationService: AuthorizationService,
        @Inject(Router) private router: Router
    ) {
        super();
    }

    ngOnInit(): void {
        this.setFormGroup();
    }

    setFormGroup = (): void => {
        this.formGroup = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)])
        } as MapPick<IUser, keyof IUser, FormControl>);
    }

    submit = (): void => {
        if (this.formGroup.valid) {
            this.authorizationService.signin(this.formGroup.value).subscribe(() => this.router.navigate(['/']));
        }
    }
}
