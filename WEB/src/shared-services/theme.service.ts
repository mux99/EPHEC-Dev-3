import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    theme_1 = JSON.parse(`{
        "background-1": "#413b47",
        "background-2": "#3d3a41",
        "background-3": "#3d3a41",
        "accent-1": "#5f2a87",
        "accent-2": "#17121f",
        "accent-1-hover": "#",
        "accent-2-hover": "#",
        "text-color": "#f7f7f7",
        "text-color-2": "808080"
      }`);
    theme_2 = JSON.parse(`{
        "background-1": "#413b47",
        "background-2": "#3d3a41",
        "background-3": "#3d3a41",
        "accent-1": "#bc3855",
        "accent-2": "#010b1a",
        "accent-1-hover": "#c94965",
        "accent-2-hover": "#010b1a",
        "text-color": "#f7f7f7",
        "text-color-2": "808080"
      }`);
    theme_3 = JSON.parse(`{
        "background-1": "#413b47",
        "background-2": "#3d3a41",
        "background-3": "#3d3a41",
        "accent-1": "#00b387",
        "accent-2": "#161b22",
        "accent-1-hover": "#",
        "accent-2-hover": "#",
        "text-color": "#f7f7f7",
        "text-color-2": "808080"
      }`);

    setTheme(theme: any) {
        for(let key in theme){
          document.documentElement.style.setProperty(`--${key}`, theme[key]);
        }
    }
}