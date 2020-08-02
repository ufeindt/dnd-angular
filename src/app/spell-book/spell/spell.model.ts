export class Spell {
  public name: string;
  public link: string;
  public level: number;
  public school: string;

  constructor(spell) {
    this.name = spell.name;
    this.link = spell.link;
    this.level = spell.level;
    this.school = spell.school;
  }
}
