import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { Subscription } from 'rxjs';
import { AccesodbService } from 'src/app/services/accesodb.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  postCreator;
  rat;
  read = true;
  form;
  public media = [{ rating: 0 }];

  constructor(private store: Store<AppState>,
    private db: AccesodbService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.subs.add(this.db.getProfile().subscribe((x) => this.user = x))
    this.subs.add(this.store.subscribe((x) => this.state = x));
    this.subs.add(this.db.getUsers().subscribe((x: any) => {
      x.forEach(element => {
        if (element._id == this.post.creator_id) {
          this.postCreator = element.email;
          return 0;
        }
      });

    }));
    this.subs.add(this.db.getRatings().subscribe((x: any) => {
      x.forEach(element => {
        if (element.post_id == this.post._id && element.user_id == this.user._id) {
          this.rat = element.rating;

          return 0;
        }
      });
      this.read = false;
    }))
    /*this.subs.add(this.db.populate(this.post._id).subscribe((x: any) => {
      console.log(x);
      let suma = 0;
      x.rating.forEach((x) => {
        suma = x.rating + suma;
      })
      this.media = [];
      suma = suma / x.rating.length;
      this.media.push({ rating: parseFloat(parseFloat(suma + "").toFixed(2)) });

    }))*/

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  async sendRating(event) {
    const payload = {
      post: this.post._id,
      rating: event
    }
    let a = await this.subs.add(this.db.setRatings(payload).subscribe((x) => {
      this.subs.add(this.db.populate(this.post._id).subscribe((x: any) => {
        let suma = 0;
        x.rating.forEach((x) => {
          suma = x.rating + suma;
        })
        this.media = [];
        suma = suma / x.rating.length;
        this.media.push({ rating: parseFloat(parseFloat(suma + "").toFixed(2)) });


      }))
    }));


  }

  /*set rating(value) {
    this.post.rating = value;
  }

  get rating() {
    return this.post.rating;

  }*/

  openDetails(content) {
    let value = this.post.rating;
    this.modalService.open(content);

  }

  openComment(content) {

    this.form = new FormGroup({
      comment: new FormControl('', Validators.required),
    });
    this.modalService.open(content);
  }

  onSubmit() {
    let comentario = {
      user_email: this.user.email,
      comment: this.form.value.comment
    }
    this.db.setComment({ comment: this.form.value.comment, post: this.post._id }).subscribe((x) => {
      this.post.comments.push(comentario);
      this.form.reset();
      this.toastr.success("Comentario añadido")
    });

  }

  /*popul() {
    /*this.db.populate(this.post._id).subscribe((x: any) => {
      console.log(x);
      let suma = 0;
      x.rating.forEach((x) => {
        suma = x.rating + suma;
      })
      this.media = suma / x.rating.length;

    })
    setTimeout(() => {
      this.media = this.media;
    }, 1000)
  }*/
}
