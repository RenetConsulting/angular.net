import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { SetError, SetSuccess } from '~/actions/messenger.actions';
import { MessagesType } from '~/enums/messages.type';
import { IError } from '~/interfaces/error';
import { AuthService } from '@renet-consulting/auth';
import { SignupError, SignupRequest, SignupSuccess } from './actions';
import { SignupEffects } from './effects';

describe('SignupEffects', () => {

    let effects: SignupEffects;

    let actions: Observable<any>;
    let authService: jasmine.SpyObj<AuthService>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                SignupEffects,
                provideMockActions(() => actions),
                {
                    provide: AuthService,
                    useValue: jasmine.createSpyObj<AuthService>('AuthService', ['signup'])
                },
                { provide: Router, useValue: jasmine.createSpyObj<Router>('Router', ['navigate']) },
            ],
        });

        effects = TestBed.get(SignupEffects);
        authService = TestBed.get(AuthService);
        router = TestBed.get(Router);
    });

    it('should work', () => {
        expect(effects).toBeDefined();
    });
    describe('signupRequest', () => {

        let formGroup: FormGroup;

        beforeEach(() => {
            formGroup = jasmine.createSpyObj<FormGroup>('FormGroup', ['reset']);
        });

        it('success', () => {
            authService.signup.and.returnValue(of(null));
            const action = new SignupRequest(formGroup);
            const completion = new SignupSuccess();
            const expected = cold('--b', { b: completion });
            actions = hot('--a-', { a: action });
            expect(effects.signupRequest).toBeObservable(expected);
            expect(formGroup.reset).toHaveBeenCalled();
        });
        it('error', () => {
            const error = 'bob';
            authService.signup.and.returnValue(throwError({ error }));
            const action = new SignupRequest(formGroup);
            const completion = new SignupError(error);
            const expected = cold('--b', { b: completion });
            actions = hot('--a-', { a: action });
            expect(effects.signupRequest).toBeObservable(expected);
        });
    });
    it('signupSuccess', () => {
        const action = new SignupSuccess();
        const completion = new SetSuccess(MessagesType.checkEmail);
        const expected = cold('--b', { b: completion });
        actions = hot('--a-', { a: action });
        expect(effects.signupSuccess).toBeObservable(expected);
        expect(router.navigate).toHaveBeenCalledWith(['/signin']);
    });
    it('signupError', () => {
        const error = { error_description: 'bob error' } as IError;
        const action = new SignupError(error);
        const completion = new SetError(error);
        const expected = cold('--b', { b: completion });
        actions = hot('--a-', { a: action });
        expect(effects.signupError).toBeObservable(expected);
    });
});