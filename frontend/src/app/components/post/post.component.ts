import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { Subscription } from 'rxjs';
import { AccesodbService } from 'src/app/services/accesodb.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {


  @Input('post') post: any;
  state;
  subs = new Subscription();
  user;
  constructor(private store: Store<AppState>,
    private db: AccesodbService) { }

  ngOnInit() {
    this.subs.add(this.store.subscribe((x) => this.state = x));
    this.subs.add(this.db.getUsers().subscribe((x: any) => {
      x.forEach(element => {
        if (element._id == this.post.creator_id) {
          this.user = element;
          return 0;
        }
      });

    }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
