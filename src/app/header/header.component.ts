import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  ngAfterViewInit() {

    document.addEventListener("DOMContentLoaded", function () {

      var menuLinks = document.querySelectorAll(".offcanvas-menu nav ul li a");


      menuLinks.forEach(function (link) {
        link.addEventListener("click", function () {

          var checkbox = document.getElementById("toogle-menu") as HTMLInputElement;
          if (checkbox) {
            checkbox.checked = false;
          }
        });
      });
    });
  }

}
