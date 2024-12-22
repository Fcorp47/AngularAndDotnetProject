import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FullData, Property, Data } from './Models/fulldata.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  headers = ['Sampling Time', 'Project Name', 'Construction Count', 'Is Construction Completed', 'Length of the road'];
  samplingTimes: string[] = [];
  selectedSamplingTime: string | null = null;
  selectedData: any = null; 
  detailForm: FormGroup;
  FullData: FullData = new FullData() ;
  savedMessage: string = '';

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.detailForm = this.fb.group({
      projectName: ['', Validators.required],
      constructionCount: [null],
      isConstructionCompleted: [false],
      lengthOfRoad: [null]
    });
  }

  ngOnInit() {
    this.dataService.getData().subscribe((data: any) => {
      this.FullData = data;
      this.samplingTimes = data.Datas.map((d: any) => d.SamplingTime);
      this.selectedSamplingTime = this.samplingTimes[0];
      this.selectedData = data.Datas[0];
      this.FillFormDetails(this.selectedData);
    });
  }

  FillFormDetails(data: Data){
    const props = data.Properties.reduce((acc: any, prop: any) => {
      acc[prop.Label] = prop.Value;
      return acc;
    }, {});

    this.detailForm.patchValue({
      projectName: props['Project Name'] || '',
      constructionCount: props['Construction Count'] || null,
      isConstructionCompleted: props['Is Construction Completed'] || false,
      lengthOfRoad: props['Length of the road'] || null
    });
  }

  onSelectSamplingTime(samplingTime: string) {
    this.selectedSamplingTime = samplingTime;
    this.dataService.getData().subscribe((data: any) => {
      const selected = data.Datas.find((d: any) => d.SamplingTime === samplingTime);
      if (selected) {
        this.selectedData = selected;
        this.FillFormDetails(this.selectedData);
        this.savedMessage = '';
      }
    });
  }

  onSave() {
    console.log('btn clicked check ::');
    this.selectedData.Properties = [
      { Label: 'Project Name', Value: this.detailForm.get('projectName')?.value },
      { Label: 'Construction Count', Value: this.detailForm.get('constructionCount')?.value },
      { Label: 'Is Construction Completed', Value: this.detailForm.get('isConstructionCompleted')?.value },
      { Label: 'Length of the road', Value: this.detailForm.get('lengthOfRoad')?.value }
    ];
    console.log("selecteddata properties :: "+this.selectedData.Properties);
    console.log("Fulldata properties :: "+this.FullData);
    this.FullData.Datas = this.FullData.Datas.map((data:any)=>{
      return data.SamplingTime === this.selectedSamplingTime ? this.selectedData : data
    });

    this.dataService.saveData(this.FullData).subscribe(response => {
      this.savedMessage = 'Data saved successfully!';
      console.log('inside saved check');
    }, error=> {
      this.savedMessage = 'Data could not be saved!';
    });
  }

  getValueFromLabel(properties: any[], label: string): any {
    const prop = properties.find(p => p.Label === label);
    return prop ? prop.Value : ''; 
  }
}
