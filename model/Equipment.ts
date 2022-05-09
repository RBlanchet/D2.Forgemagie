import Effect from "~/model/Effect";

export default class Equipment {
  private GID: string;
  private name: string;
  private effects: Effect[];

  constructor(
    GID: string,
    name: string,
    effects: Effect[]
  ) {
    this.GID = GID;
    this.name = name;
    this.effects = effects;
  }

  public getEffects(): Effect[] {
    return this.effects;
  }
}
