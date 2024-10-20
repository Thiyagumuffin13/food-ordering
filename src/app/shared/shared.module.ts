import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';



@NgModule({
  declarations: [HeaderComponent, SidenavComponent,FooterComponent,ProductsComponent],
  imports: [
    CommonModule,
    IonicModule 
  ],
  exports: [HeaderComponent, SidenavComponent,FooterComponent,ProductsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
