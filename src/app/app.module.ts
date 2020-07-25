import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MagicItemListComponent } from './magic-item-list/magic-item-list.component';
import { MagicItemComponent } from './magic-item-list/magic-item/magic-item.component';
import { MagicShopService} from './magic-item-list/magic-shop.service';

@NgModule({
  declarations: [
    AppComponent,
    MagicItemListComponent,
    MagicItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MagicShopService],
  bootstrap: [AppComponent]
})
export class AppModule { }
