import { ControlValueAccessor } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive()
export abstract class ControlValueAccessorBaseDirective implements ControlValueAccessor {

    value: any;
    disabled: boolean;
    onChange: (x: any) => any;
    onTouched: () => void;

    constructor() { }

    writeValue(x: any): void {
        this.value = x;
        if (this.onChange) {
            this.onChange(x);
        }
    }

    registerOnChange(fn: (x: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: (x?: any) => void): void {
        this.onTouched = fn;
    }

    setDisabledState(x: boolean): void {
        this.disabled = x;
    }
}
