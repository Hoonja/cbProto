import { User } from './user';

export class Cell {
  constructor(
    public id: number,
    public owner: User,
    public cost: number,
    public combatCount: number
  ) {}
}
