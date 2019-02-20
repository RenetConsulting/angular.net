import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HTTP_HEADERS } from '../../consts/http-headers';
import { IChangePassword } from '../../interfaces/change-password';
import { IConfirmEmail } from '../../interfaces/confirm-email';
import { IResetPassword } from '../../interfaces/reset-password';
import { BASE_URL } from '../../tokens/base.url';
import { ToolsService } from '../tools/tools.service';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    /** the URL of a controller */
    readonly url = '/api/account';

    constructor(
        @Inject(BASE_URL) private baseUrl: string,
        @Inject(HttpClient) private http: HttpClient,
        @Inject(ToolsService) private toolsService: ToolsService,
    ) { }

    changePassword = (model: IChangePassword) => this.http
        .post(`${this.baseUrl}${this.url}/ChangePassword`, model, { headers: { ...HTTP_HEADERS.allowHttpError } })

    resetPassword = (model: IResetPassword) => this.http
        .post(`${this.baseUrl}${this.url}/ResetPasswordFromMail`, model, { headers: { ...HTTP_HEADERS.allowHttpError } })

    prepResetPassword = ({ email }: Pick<IResetPassword, 'email'>) => {
        const body = this.toolsService.getQuery({ email });
        return this.http
            .get(`${this.baseUrl}${this.url}/ResetPassword${body}`);
    }

    confirmEmail = (model: IConfirmEmail) => {
        const body = this.toolsService.getQuery(model);
        return this.http
            .get(`${this.baseUrl}${this.url}/ConfirmEmail${body}`);
    }
}