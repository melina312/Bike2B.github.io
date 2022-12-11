import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private translate: TranslateService, private router: Router) {
    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('de');
  }

  onClick(event :Event){
    event.preventDefault();
    this.router.navigate(['/simulation'])
  }

  ngOnInit(): void{}

  useLanguage(language: string){
    this.translate.use(language);
  }

}
