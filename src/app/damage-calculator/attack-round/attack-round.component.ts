import { Component, OnInit, Input } from '@angular/core';

import { AttackRound } from './attack-round.model';
import { DamageCalculatorService } from '../damage-calculator.service';

@Component({
  selector: 'app-attack-round',
  templateUrl: './attack-round.component.html',
  styleUrls: ['./attack-round.component.css']
})
export class AttackRoundComponent implements OnInit {
  @Input() attackRound: AttackRound;
  @Input() index: number;
  @Input() showRemoveButton: boolean;
  @Input() description: string;

  constructor(private dcService: DamageCalculatorService) { }

  ngOnInit(): void {
  }

  onChangeDice(nSides: number, oncePerTurn: boolean) {
    if (oncePerTurn) {
      if (this.attackRound.oncePerTurnDice[`d${nSides}`] <= 0) {
        delete this.attackRound.oncePerTurnDice[`d${nSides}`];
      }
    } else {
      if (this.attackRound.bonusDice[`d${nSides}`] <= 0) {
        delete this.attackRound.bonusDice[`d${nSides}`];
      }
    }
    this.dcService.updateAttackRound(this.index, this.attackRound.copy());
  }

  onChangeDescription() {
    this.dcService.descriptionChanged.emit(
      {
        index: this.index,
        description: this.description
      }
    );
  }

  onDuplicateAttackRound() {
    this.dcService.duplicateAttackRound(this.index);
  }

  onRemoveAttackRound() {
    this.dcService.removeAttackRound(this.index);
  }
}
