import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MagicShopComponent } from './magic-shop/magic-shop.component';
import { MagicItemComponent } from './magic-shop/magic-item/magic-item.component';
import { MagicShopService} from './magic-shop/magic-shop.service';
import { AppRoutingModule } from './app-routing.module';
import { SpellBookComponent } from './spell-book/spell-book.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MagicShopComponent,
    MagicItemComponent,
    SpellBookComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [MagicShopService],
  bootstrap: [AppComponent]
})
export class AppModule { }
