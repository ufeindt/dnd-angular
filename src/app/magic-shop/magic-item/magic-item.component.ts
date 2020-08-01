import { Component, OnInit, Input } from '@angular/core';

import { MagicItem } from './magic-item.model';
import { MagicShopService } from '../magic-shop.service';

@Component({
  selector: 'app-magic-item',
  templateUrl: './magic-item.component.html',
  styleUrls: ['./magic-item.component.css']
})
export class MagicItemComponent implements OnInit {
  @Input() magicItem: MagicItem;
  @Input() index: number;
  @Input() listRarity: string;

  constructor(private msService: MagicShopService) { }

  ngOnInit(): void {
  }

  onRemove() {
    this.msService.removeItem(this.listRarity, this.index);
  }

  onRerollPrice() {
    this.msService.rerollPrice(this.listRarity, this.index);
  }

  onRerollItem() {
    this.msService.rerollItem(this.listRarity, this.index);
  }

  onRerollProperties() {
    this.msService.rerollProperties(this.listRarity, this.index);
  }
}
