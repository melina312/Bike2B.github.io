import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {

  constructor(private router: Router) {}

  // Navigieren zur Komponente Entscheidungshilfe, bei Klicken des Buttons
  // onClick(event: Event) {
  //   this.router.navigate(['/entscheidungshilfe']);
  // }

  /**
   * Scrollt beim Initilaisieren nach oben auf der Seite
   * 
   * Für Cloud Version: Wenn Startseite aufgerufen wird, 
   * Request an Backend, dass der Heroku-Backendserver auch hochfaehrt.
   */

  panelOpenState = false;

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
