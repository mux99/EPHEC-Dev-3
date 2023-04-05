import { Component } from '@angular/core';

@Component({
  selector: 'search-bar',
  styleUrls: ['./searchBar.component.scss'],

  template: '<img src="assets/searchIcon.svg"><input type="text" placeholder="Search...">'
})

export class SearchBar {}
