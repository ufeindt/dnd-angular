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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { DamageCalculatorComponent } from './damage-calculator/damage-calculator.component';
import { AttackRoundComponent } from './damage-calculator/attack-round/attack-round.component';
import { AttackComponent } from './damage-calculator/attack-round/attack/attack.component';
import { DamageStatsComponent } from './damage-calculator/damage-stats/damage-stats.component';
import { DamageCalculatorService } from './damage-calculator/damage-calculator.service';

@NgModule({
  declarations: [
    AppComponent,
    MagicShopComponent,
    MagicItemComponent,
    SpellBookComponent,
    HeaderComponent,
    SpellComponent,
    DamageCalculatorComponent,
    AttackRoundComponent,
    AttackComponent,
    DamageStatsComponent
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
    MatSliderModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatTableModule
  ],
  providers: [
    MagicShopService,
    SpellBookService,
    DamageCalculatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
