export class Room {
  constructor(
    public id: string,
    public width: number,
    public height: number,
    public value?: number,
    public users?: any,
    public cells?: any
  ) {}
}
