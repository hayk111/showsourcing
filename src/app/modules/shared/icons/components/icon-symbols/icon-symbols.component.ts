import { Component, OnInit } from '@angular/core';

// This component should be put once in the app so it can create symbols for enhanced performances
// Perf was an issue in big lists https://fontawesome.com/how-to-use/performance-and-security
@Component({
  selector: 'icon-symbols-app',
  templateUrl: './icon-symbols.component.html',
  styleUrls: ['./icon-symbols.component.scss']
})
export class IconSymbolsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
