import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared-services/auth.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profilePage.component.html',
  styleUrls: ['./profilePage.component.scss']
})
export class ProfilePage implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}


  ngOnInit() {
    const navLinks = document.querySelectorAll('.nav li');
    
    const accountLink = document.querySelector('.nav #accountLink') as HTMLAnchorElement;
    accountLink.classList.add('selected');
    navLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        navLinks.forEach(link => {
          link.classList.remove('selected');
        });
        const li = event.currentTarget as HTMLLIElement;
        li.classList.add('selected');
      });
    });
  }
  
  activeSection = 'account-section';
  
  showSection(sectionId: string) {
    const sections = ['account-section', 'password-section', 'appearance-section', 'premium-section'];
    for (const section of sections) {
      if (section === sectionId) {
        this.activeSection = sectionId;
        document.getElementById(sectionId)?.classList.add('active');
        document.getElementById(sectionId)?.classList.remove('disabled');
      } else {
        document.getElementById(section)?.classList.add('disabled');
        document.getElementById(section)?.classList.remove('active');
      }
    }
  }

  disableInputs() {
    const inputs = document.querySelectorAll('.accountInput') as NodeListOf<HTMLInputElement>;
    inputs.forEach(input => {
      input.disabled = true;
    });
  }
  
  enableInputs() {
    const inputs = document.querySelectorAll('.accountInput') as NodeListOf<HTMLInputElement>;
    inputs.forEach(input => {
      input.disabled = false;
      input.focus();
    });
  }
}
