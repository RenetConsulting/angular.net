import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthorizationService } from "../../services/authorization/authorization.service";

@Component({
    selector: "app-nav-menu",
    templateUrl: "./nav-menu.component.html",
    styleUrls: ["./nav-menu.component.scss"]
})
export class NavMenuComponent {

    isExpanded = false;

    constructor(
        @Inject(Router) private router: Router,
        @Inject(AuthorizationService) private authorizationService: AuthorizationService,
    ) { }

    collapse = (): void => {
        this.isExpanded = false;
    }

    toggle = (): void => {
        this.isExpanded = !this.isExpanded;
    }

    signout = (): void => {
        this.authorizationService.logout();
        this.router.navigate(["/sign-in"]);
    }

    isAuthenticated = () => { return this.authorizationService.isAuthorized;}
}
