import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mapTo, mergeMap, tap } from 'rxjs/operators';
import { SetError, SetSuccessMessage } from '../../../actions/error.actions';
import { MessagesType } from '../../../enums/messages.type';
import { AccountService } from '../../../services/account/account.service';
import { ConfirmEmail, ConfirmEmailSuccess } from './actions';
import { ConfirmEmailTypes } from './types';

@Injectable()
export class ConfirmEmailEffects {

    constructor(
        @Inject(Actions) private actions: Actions,
        @Inject(AccountService) private accountService: AccountService,
    ) { }

    @Effect() confirmEmail = this.actions.pipe(
        ofType<ConfirmEmail>(ConfirmEmailTypes.CONFIRM_EMAIL_REQUEST),
        mergeMap(x => this.accountService.confirmEmail(x.payload.value).pipe(
            tap(() => x.payload.reset()),
            mapTo(new ConfirmEmailSuccess()),
            catchError(e => of(new SetError(e.error)))
        ))
    );

    @Effect() confirmEmailSuccess = this.actions.pipe(
        ofType<ConfirmEmailSuccess>(ConfirmEmailTypes.CONFIRM_EMAIL_SUCCESS),
        mapTo(new SetSuccessMessage(MessagesType.emailConfirmed))
    );
}