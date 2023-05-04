import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared-services/auth.service';
import { ThemeService } from 'src/shared-services/theme.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profilePage.component.html',
  styleUrls: ['./profilePage.component.scss']
})
export class ProfilePage {

  constructor(
    private router: Router,
    private auth: AuthService,
    private theme: ThemeService
  ) {}  
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

  themeSelect(t: string) {
    if (t == "1") this.theme.setTheme(this.theme.theme_1);
    if (t == "2") this.theme.setTheme(this.theme.theme_2);
    if (t == "3") this.theme.setTheme(this.theme.theme_3);
  }
}
