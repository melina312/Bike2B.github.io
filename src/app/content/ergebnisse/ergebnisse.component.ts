import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ExportState } from '../../store/export/export.reducer';
import { selectExportModel } from '../../store/export/export.selector';
import { ExportModel } from '../../model/export.model';
import { j2xParser } from 'fast-xml-parser';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ergebnisse',
  templateUrl: './ergebnisse.component.html',
  styleUrls: ['./ergebnisse.component.css']
})
export class ErgebnisseComponent implements OnInit {

  export$ = this.store.pipe(select(selectExportModel));
  downloadUrl: SafeUrl | undefined = undefined;
  filename = "";
  constructor(private store: Store<ExportState>,
              private sanitizer: DomSanitizer, private route: Router) {
  }

  async ngOnInit(): Promise<void> {

    let data: ExportModel | {} =  {};
    await this.export$.subscribe(i => data = i);
    const defaultOptions = {
      format: true,
      attributeNamePrefix: 'attr_',
      ignoreAttributes: false,
    };
    const parser = new j2xParser(defaultOptions);
    const xmlData = parser.parse(data);

    this.filename = "output";
    this.downloadUrl = this.sanitizer.bypassSecurityTrustUrl(
      "data:text/xml;charset=UTF-8," + encodeURIComponent(xmlData)
    );
    //this.store.dispatch(addSellwish())
  }
}