import { Inject, Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';

@Injectable({
    providedIn: 'root'
})
export class AccessService {

    constructor(
        @Inject(TokenService) private tokenService: TokenService,
    ) { }

    get authorized(): boolean {
        return this.tokenService.valid;
    }
}