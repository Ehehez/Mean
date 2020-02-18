import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.states';
import { State } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  state;
  headForm;

  options;

  constructor(private store: State<AppState>,
    private router: Router) {
  }

  ngOnInit() {
    this.options = [
      {
        name: "Nombre",
        value: "name"
      },
      {
        name: "Direccion",
        value: "address"
      },
      {
        name: "Trabajo",
        value: "job"
      }];
    this.store.subscribe((x) => this.state = x);
    this.headForm = new FormGroup({
      select: new FormControl("", Validators.required),
      search: new FormControl("", Validators.required),
    });
  }

  gotoMuro() {
    this.router.navigateByUrl('/muro');
  }

  search() {
    this.router.navigateByUrl('/users/' + this.headForm.value.select + '/' + this.headForm.value.search);
  }
}
