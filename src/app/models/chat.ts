export class Chat {
  constructor(
    public userId: string,
    public roomId: string,
    public data: {text: string}
  ) {}
}
