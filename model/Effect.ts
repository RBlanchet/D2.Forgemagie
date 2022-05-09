import RuneProvider from "~/provider/RuneProvider";
import Rune from "~/model/Rune";

export default class Effect {
  private id: number;
  private actionId: number;
  private value: number;
  private rune: Rune|undefined;
  private min: number = 0;
  private max: number = 0;

  constructor(
    id: number,
    actionId: number,
    value: number
  ) {
    this.id = id;
    this.actionId = actionId;
    this.value = value;
    this.rune = RuneProvider.getAll().find(r => r.boostId === actionId || r.deboostId === actionId);
  }

  public setMin(min: number): Effect {
    this.min = min;

    return this;
  }

  public setMax(max: number): Effect {
    this.max = max;

    return this;
  }
}
