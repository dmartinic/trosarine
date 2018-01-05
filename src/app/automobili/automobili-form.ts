export class AutomobiliForm {
    constructor(
    public cijena: number,
    public tipgoriva: string,
    public co2: number,
    public starost?: number,
    public datum?: string
    ) {}
  }