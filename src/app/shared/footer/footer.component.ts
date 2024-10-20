import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {
  //@Input() totalPrice: number = 0;
  @Input() totalCount: number = 0;
  constructor(private router: Router) { }

  ngOnInit() {}
  goToCheckout(){

    this.router.navigate(['/checkout']);
  }
}
