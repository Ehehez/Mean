import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { AccesodbService } from 'src/app/services/accesodb.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  user;
  users;
  state;
  subs = new Subscription();
  params;

  constructor(private store: Store<AppState>,
    private db: AccesodbService,
    private activatedRoute: ActivatedRoute,
    private changes: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.subs.add(this.store.subscribe((x) => this.state = x));
    this.params = this.activatedRoute.snapshot.params;
    this.subs.add(this.db.getUsersByFilter(this.params.field, this.params.value).subscribe(x => {
      this.users = x;
      this.users = this.users.filter(x => x.email != this.state.auth.user.email);
      this.users.forEach(element => {
        if (this.comprobar(element._id)) {
          element.followed = false;
        } else element.followed = true;
      });
    }));
    this.subs.add(this.subs.add(this.db.getProfile().subscribe(x => this.user = x)));


  }


  comprobar(id) {
    let result = true;
    if (this.user != undefined) {
      this.user.follows.forEach(element => {
        if (element._id == id) {
          result = false;
        }
      });
      return result;
    }

  }

  followUser(id) {
    this.db.setFollow(id).subscribe((x) => { });
    this.user.follows.forEach(element => {
      if (element._id == id && element.followed == false) {
        element.followed = true;
      }
    })
  }

  unfollowUser(id) {
    this.db.unsetFollow(id).subscribe((x) => { });

    this.user.follows.forEach(element => {
      if (element._id == id && element.followed == true) {
        element.followed = false;
        return true;
      }
    })
  }
}
