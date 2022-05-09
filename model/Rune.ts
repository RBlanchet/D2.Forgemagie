export default class Rune {
  private _name: string;
  private _boostId: number;
  private _deboostId: number;
  private boostName: string;
  private deboostName: string;
  private pool: number;

  constructor(
    name: string,
    boostId: number,
    deboostId: number,
    boostName: string,
    deboostName: string,
    pool: number,
  ) {
    this._name = name;
    this._boostId = boostId;
    this._deboostId = deboostId;
    this.boostName = boostName;
    this.deboostName = deboostName;
    this.pool = pool;
  }

  get boostId(): number {
    return this._boostId;
  }

  get deboostId(): number {
    return this._deboostId;
  }

  get name(): string {
    return this._name;
  }
}
