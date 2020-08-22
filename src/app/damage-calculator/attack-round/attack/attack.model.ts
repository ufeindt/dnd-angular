import { DamageDice } from './damage-dice.model';

export class Attack {
  attackModifier: number;
  damageBonus: number;
  damageDice: DamageDice;
  advantage: boolean = false;
  disadvantage: boolean = false;
  greatWeaponFighting: boolean = false;
  acRange: number[];

  constructor (attackModifier: number,
               damageBonus: number,
               damageDice: DamageDice,
               advantage?: boolean,
               disadvantage?: boolean,
               greatWeaponFighting?: boolean) {
    this.attackModifier = attackModifier;
    this.damageBonus = damageBonus;
    this.damageDice = damageDice;
    if (advantage) {
      this.advantage = advantage;
    }
    if (disadvantage) {
      this.disadvantage = disadvantage;
    }
    if (greatWeaponFighting) {
      this.greatWeaponFighting = greatWeaponFighting;
    }
    this.acRange = [2 + attackModifier, 20 + attackModifier];
  }

  copy() {
    return new Attack(
      this.attackModifier,
      this.damageBonus,
      Object.assign({}, this.damageDice),
      this.advantage,
      this.disadvantage,
      this.greatWeaponFighting
    );
  }

  getExpectedDamage(ac: number, bonusDice?: DamageDice) {
    if (!bonusDice) {
      bonusDice = {};
    }

    let damage: number = 0;
    for (let i = 4; i <= 12; i += 2) {
      let diceKey = `d${ i }`;
      if (this.greatWeaponFighting) {
        // According to Jeremy Crawford only the weapon dice are
        damage += (this.damageDice[diceKey] || 0) * (i - 1) * (i + 4) / i / 2;
      } else {
        damage += (this.damageDice[diceKey] || 0) * (i + 1) / 2;
      }
      damage += (bonusDice[diceKey] || 0) * (i + 1) / 2;
    }
    let criticalDamage: number = 2 * damage + this.damageBonus;
    damage += this.damageBonus;

    let probabilities = this.getHitProbabilities(ac);
    damage *= probabilities.hit;
    damage += criticalDamage * probabilities.critical;

    return damage;
  }

  getHitProbabilities(ac: number) {
    if (this.advantage) {
      var probabilities = {critical: 0.0975, hit: 0, miss: 0}
    } else if (this.disadvantage) {
      var probabilities = {critical: 0.0025, hit: 0, miss: 0}
    } else {
      var probabilities = {critical: 0.05, hit: 0, miss: 0}
    }

    if (2 + this.attackModifier >= ac) {
      // Only nat 1 will miss
      if (this.advantage) {
        probabilities['hit'] = 0.9;
        probabilities['miss'] = 0.0025;
      } else if (this.disadvantage) {
        probabilities['hit'] = 0.9;
        probabilities['miss'] = 0.0975;
      } else {
        probabilities['hit'] = 0.9;
        probabilities['miss'] = 0.05;
      }
    } else if (19 + this.attackModifier < ac) {
      // Only nat 20 will hit
      probabilities['hit'] = 0;
      if (this.advantage) {
        probabilities['miss'] = 0.9025;
      } else if (this.disadvantage) {
        probabilities['miss'] = 0.9975;
      } else {
        probabilities['miss'] = 0.95;
      }
    } else {
      if (this.advantage) {
        probabilities['hit'] = (361 - Math.pow(ac - this.attackModifier - 1, 2)) * 0.0025;
        probabilities['miss'] = Math.pow(ac - this.attackModifier - 1, 2) * 0.0025;
      } else if (this.disadvantage) {
        probabilities['hit'] = (20 + this.attackModifier - ac) * (22 + this.attackModifier - ac) * 0.0025;
        probabilities['miss'] = (400 - Math.pow(21 + this.attackModifier - ac, 2)) * 0.0025;
      } else {
        probabilities['hit'] = (20 + this.attackModifier - ac) * 0.05;
        probabilities['miss'] = (ac - this.attackModifier - 1) * 0.05;
      }
    }

    return probabilities;
  }
}
