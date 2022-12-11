import { Component } from '@angular/core';
import { parse } from 'fast-xml-parser';
import { ImportModel } from 'src/app/model/import.model';
import { Store } from '@ngrx/store';
import { addImportXml } from 'src/app/store/import/import.actions';
import { ImportState } from 'src/app/store/import/import.reducer';
import { StepperServiceService } from 'src/app/stepper-service.service';
import { browserRefresh } from '../../app.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent {
  fileName = '';
  dateiimport_file_auswahl = '';

  type = 'simulation'
  browserRefresh: boolean = true;
  
  constructor(private store: Store<ImportState>, private stepperservice: StepperServiceService, private route: Router) {}

  // @ts-ignore
  onFileSelected(event): void {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const reader = new FileReader();
      const options = {
        attributeNamePrefix: '',
        ignoreAttributes: false,
        // arrayMode: true,
      };
      reader.readAsText(file);
      reader.onload = () => {
        const xmlDataAsJson: ImportModel = parse(reader.result as string, options, true);
        this.store.dispatch(addImportXml(xmlDataAsJson));
        this.route.navigate(['/absatzplanung']);
      }
    }
  }
  ngOnInit() {
    this.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);
    if (browserRefresh == false) {
      window.location.reload();
      this.browserRefresh = true;
    }
  }
}
