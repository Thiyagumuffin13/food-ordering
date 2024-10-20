import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent  implements OnInit {
  @Output() categorySelected = new EventEmitter<string>();

  selectCategory(category: string) {
    console.log("[sd[[[",category);
    this.categorySelected.emit(category);
  }
  constructor() { }

  ngOnInit() {
    
  }

}
