import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {

    @Input() size = 152;
    @Input() cssClass: string;

    constructor() { }
}
