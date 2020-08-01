export class MagicItem {
  public name: string;
  public link: string;
  public itemType: string;
  public rarity: string;
  public price: number = 0;
  public consumable: boolean;
  public prefix: string;
  public prefixLink: string;
  public suffix: string;
  public suffixLink: string;
  public tableKey: string;
  public rerollType: string;
  public originalItem: {[key: string]: any};

  constructor(itemData, tableKey) {
    this.name = itemData.name;
    this.link = itemData.link;
    this.itemType = itemData.itemType;
    this.rarity = itemData.rarity;
    this.consumable = itemData.consumable;
    this.tableKey = tableKey;

    if (itemData.price !== undefined) {
      this.price = itemData.price;
    }
    if (itemData.prefix !== undefined) {
      this.prefix = itemData.prefix;
    }
    if (itemData.prefixLink !== undefined) {
      this.prefixLink = itemData.prefixLink;
    }
    if (itemData.suffix !== undefined) {
      this.suffix = itemData.suffix;
    }
    if (itemData.suffixLink !== undefined) {
      this.suffixLink = itemData.suffixLink;
    }
    if (itemData.rerollType !== undefined) {
      this.rerollType = itemData.rerollType;
    }
    if (itemData.originalItem !== undefined) {
      this.originalItem = itemData.originalItem;
    }
  }
}
