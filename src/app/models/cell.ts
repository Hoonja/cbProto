export const CELL_INIT_VALUE = 10;
export class Cell {
  constructor(
    public id: number,
    public ownerId: string,
    public team: string,
    public cost: number,
    public combatCount: number,
    public occupied: boolean
  ) {}
}
