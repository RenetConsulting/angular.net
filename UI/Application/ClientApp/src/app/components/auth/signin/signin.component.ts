import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, share, take } from 'rxjs/operators';
import { EMAIL_VALIDATORS } from '~/consts/email.validators';
import { PASSWORD_VALIDATORS } from '~/consts/password.validators';
import { IUser } from '~/interfaces/user';
import { RootStore } from '~/reducers';
import { selectFacebookAppId, selectGoogleClientId } from '~/selectors/settings.selectors';
import { selectAuthUser, selectSigninError } from '../selectors';
import { ResetError, SigninRequest } from './actions';

@Component({
    selector: 'signin',
    templateUrl: './signin.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit, OnDestroy {

    readonly subscription = new Subscription();
    readonly errors = this.store.select(selectSigninError).pipe(share());
    readonly facebookAppId = this.store.select(selectFacebookAppId);
    readonly googleClientId = this.store.select(selectGoogleClientId);
    formGroup: FormGroup;

    constructor(
        @Inject(Store) private store: Store<RootStore>
    ) { }

    ngOnInit(): void {
        this.setFormGroup();
        this.subscription.add(this.store.select(selectAuthUser).pipe(
            take(1),
            filter(i => !!i)).subscribe(this.patchValue));
    }

    ngOnDestroy(): void {
        this.store.dispatch(new ResetError());
        this.subscription.unsubscribe();
    }

    setFormGroup = (): void => {
        this.formGroup = new FormGroup({
            email: new FormControl('', EMAIL_VALIDATORS),
            password: new FormControl('', PASSWORD_VALIDATORS),
            isRemember: new FormControl(false),
            captcha: new FormControl()
        } as MapPick<IUser, keyof IUser, FormControl>);
    }

    patchValue = (i: IUser): void => this.formGroup.patchValue(i);

    submit = (): void => {
        if (this.formGroup.valid) {
            this.store.dispatch(new SigninRequest(this.formGroup));
        }
    }
}