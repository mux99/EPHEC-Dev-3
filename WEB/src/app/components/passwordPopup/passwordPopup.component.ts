import { Component } from '@angular/core';

@Component({
  selector: 'password-popup',
  templateUrl: './passwordPopup.component.html',
  styleUrls: ['./passwordPopup.component.scss']
})

export class PasswordPopup {
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
