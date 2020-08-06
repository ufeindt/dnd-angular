import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { MagicItemComponent } from './magic-shop/magic-item/magic-item.component';
import { MagicShopComponent } from './magic-shop/magic-shop.component';
import { MagicShopService} from './magic-shop/magic-shop.service';
import { SpellBookComponent } from './spell-book/spell-book.component';
import { SpellBookService } from './spell-book/spell-book.service';
import { SpellComponent } from './spell-book/spell/spell.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

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
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSliderModule
  ],
  providers: [
    MagicShopService,
    SpellBookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
