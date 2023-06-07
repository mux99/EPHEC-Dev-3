import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserActions } from 'src/app/components/userActions/userActions.component';
import { AuthService } from 'src/shared-services/auth.service';

@Component({
  selector: 'sign-in-page',
  templateUrl: './signInPage.component.html',
  styleUrls: ['./signInPage.component.scss']
})

export class SignInPage {
  constructor(
    private router: Router,
    private auth: AuthService,
    private uaction: UserActions
  ) {}

  onClickSubmit(data: any) {
    let obs = this.auth.login(data.email, data.password);
    obs.subscribe(
      (obs_data: any) => {
        if (obs_data.check) {
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 500);
        }
      }
    )
  }

  togglePassword() {
    const passwordInput = document.querySelector("#password");
    const eyeIcon = document.querySelector("#togglePassword");
    if (passwordInput && eyeIcon) {
      if (passwordInput.getAttribute("type") === "password") {
        passwordInput.setAttribute("type", "text");
        eyeIcon.classList.add("eye-slash");
      } else {
        passwordInput.setAttribute("type", "password");
        eyeIcon.classList.remove("eye-slash");
      }
    }
  }
}