import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/store/auth/auth.actions';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {


  subs = new Subscription();
  user: User = new User();
  state;
  constructor(private store: Store<AppState>,
    private router: Router,
    private AuthService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.subs.add(this.store.subscribe((o) => {
      this.state = o;
    }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onSubmit(): void {
    const payload = {
      username: this.user.email,
      email: this.user.email,
      password: this.user.password
    };
    let asd;
    this.subs.add(this.AuthService.signUp(payload.username, payload.email, payload.password).subscribe((x: any) => {
      if (x.username != undefined) {
        this.router.navigateByUrl('/login');
      } else {
        this.toastr.error(x.errmsg);
        this.user = new User();
      }

    }))
  }
}
