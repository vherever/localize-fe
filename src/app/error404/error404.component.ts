import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'error404.component.html',
  styleUrls: ['error404.component.scss'],
})
export class Error404Component {
  constructor(
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((params) => {
      console.log('___ params', params); // todo
    });
  }
}
