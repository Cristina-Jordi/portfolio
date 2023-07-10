import { Component, HostListener} from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(public router: Router) { } 
  title = 'portfolio';
  showButton = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showButton = window.pageYOffset > 200;
  }
}
