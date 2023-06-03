import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/shared-services/auth.service';
import { ThemeService } from 'src/shared-services/theme.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profilePage.component.html',
  styleUrls: ['./profilePage.component.scss']
})
export class ProfilePage {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private theme: ThemeService
  ) {}  
  activeSection = 'account-section';

  currentSection: string = 'account-section';

  selectSection(section: string) {
    this.currentSection = section;
  }

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
    let th;
    if (t == "1") th = this.theme.default;
    if (t == "2") th = this.theme.theme_2;
    if (t == "3") th = this.theme.theme_3;
    this.theme.setTheme(th);
    console.log(th)
    let httparams = new HttpParams()
    .set("t", JSON.stringify(th));
    let obs = this.http.put(`/api/me`,httparams ,this.auth.get_header());
    obs.subscribe()
  }
}
