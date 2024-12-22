export class FullData{
    Id: number;
    Name: string;
    Datas: Data[];

    constructor(Id: number = 0, Name: string = '', Datas: Data[] = []) {
        this.Id = Id;
        this.Name = Name;
        this.Datas = Datas;
      }
}

export class Data{
    SamplingTime: string;
    Properties: Property[];

    constructor(SamplingTime: string = '', Properties: Property[] = [])
    {
        this.SamplingTime = SamplingTime;
        this.Properties = Properties;
    }
}

export class Property{
    Label: string;
    Value: string | number | boolean | null;
    
    constructor(Label: string = '', Value: string | number | boolean | null = null) {
        this.Label = Label;
        this.Value = Value;
      }
}
