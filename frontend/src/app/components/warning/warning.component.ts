import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { Subscription } from 'rxjs';
import { CookiesService } from 'src/app/services/cookies.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-warning',
  template: '<div class="Site"><app-header></app-header><div class="Site-content"[innerHTML]="myContent"></div><app-footer></app-footer></div>',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {

  subs = new Subscription();
  state;
  myContent: any = "Cargando"
  constructor(private store: Store<AppState>,
    private cookiesService: CookiesService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.subs.add(this.store.subscribe((x) => this.state = x));
    this.subs.add(this.cookiesService.getPageWarning().subscribe((x: any) => {
      this.myContent = this.sanitizer.bypassSecurityTrustHtml(x.body);
    }));
  }
}
