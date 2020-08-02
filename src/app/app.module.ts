import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { MagicItemComponent } from './magic-shop/magic-item/magic-item.component';
import { MagicShopComponent } from './magic-shop/magic-shop.component';
import { MagicShopService} from './magic-shop/magic-shop.service';
import { SpellBookComponent } from './spell-book/spell-book.component';
import { SpellBookService } from './spell-book/spell-book.service';
import { SpellComponent } from './spell-book/spell/spell.component';

@NgModule({
  declarations: [
    AppComponent,
    MagicShopComponent,
    MagicItemComponent,
    SpellBookComponent,
    HeaderComponent,
    SpellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    MagicShopService,
    SpellBookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
