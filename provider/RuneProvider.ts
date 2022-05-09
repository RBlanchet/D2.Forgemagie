import Rune from "~/model/Rune";

export default class RuneProvider {
  static getAll(): Array<Rune> {
    return require('~/data/runes.json').map((r: any) => new Rune(
      r.name,
      r.boost.id,
      r.deboost.id,
      r.boost.action,
      r.deboost.action,
      r.pool
    ));
  }
}
