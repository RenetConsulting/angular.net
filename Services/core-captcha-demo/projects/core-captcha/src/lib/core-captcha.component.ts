import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, Output, Self } from '@angular/core';
import { FormControl, FormGroupDirective, NgControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IDecodedCaptcha } from './decoded.captcha';
import { IEncodedCaptcha } from './encoded.captcha';

@Component({
    selector: 'ngx-core-captcha',
    templateUrl: './core-captcha.component.html',
    styleUrls: ['./core-captcha.component.scss']
})
export class CoreCaptchaComponent implements OnInit, OnDestroy, OnChanges {

    @Input() url: string;
    @Input() width: string;
    @Input() height: string;
    @Output() readonly resolved = new EventEmitter<IDecodedCaptcha>();
    readonly subscription = new Subscription();
    readonly formControl = new FormControl();
    captcha?: IEncodedCaptcha;
    captchaAsync: Observable<IEncodedCaptcha>;

    constructor(
        @Inject(HttpClient) private http: HttpClient,
        @Optional() @Self() @Inject(NgControl) private ngControl?: NgControl,
        @Optional() @Inject(FormGroupDirective) private parentFormGroup?: FormGroupDirective,
    ) { }

    ngOnChanges(e): void {
        if (e.url) {
            this.setCaptchaAsync();
        }
    }

    ngOnInit(): void {
        this.subscription.add(this.parentFormGroup && this.parentFormGroup.ngSubmit.subscribe(() => {
            this.ngControl.control.markAsDirty();
            this.ngControl.control.markAsTouched();
            this.ngControl.control.updateValueAndValidity();
        }));
        this.subscription.add(this.formControl.valueChanges.subscribe(this.emitDecodedCaptcha));
    }

    ngOnDestroy(): void {
        this.destroy();
        this.subscription.unsubscribe();
    }

    private emitDecodedCaptcha = (captcha: string): void => this.resolved.emit({ captcha, hash: this.captcha && this.captcha.hash });

    setCaptchaAsync = () => {
        if (this.url) {
            this.destroy();
            const query = this.width && this.height ? `?width=${this.width}&height=${this.height}` : '';
            this.captchaAsync = this.http.get<IEncodedCaptcha>(`${this.url}${query}`).pipe(
                tap(i => this.captcha = i)
            );
        }
    }

    refresh = (): void => this.setCaptchaAsync();

    destroy = (): void => {
        this.captcha = null;
        this.captchaAsync = null;
        this.formControl.reset();
    }
}
