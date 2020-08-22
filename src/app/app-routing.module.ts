import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MagicShopComponent } from './magic-shop/magic-shop.component';
import { SpellBookComponent } from './spell-book/spell-book.component';
import { DamageCalculatorComponent } from './damage-calculator/damage-calculator.component';

const appRoutes : Routes = [
  { path: '', redirectTo: '/magic-shop', pathMatch: 'full' },
  { path: 'magic-shop', component: MagicShopComponent },
  { path: 'spell-book', component: SpellBookComponent },
  { path: 'damage-calculator', component: DamageCalculatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
