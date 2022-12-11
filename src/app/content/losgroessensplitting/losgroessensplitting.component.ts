import { Component, OnInit, ViewChild } from '@angular/core';
import { selectProductionlist } from 'src/app/store/export/export.selector';
import { ExportState } from 'src/app/store/export/export.reducer';
import { addProductionlist } from 'src/app/store/export/export.actions';
import { Production, Productionlist} from 'src/app/model/export.model';
import { select, Store } from '@ngrx/store';
import { browserRefresh } from '../../app.component';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


class Prodlist implements Production {
  attr_article: number;
  attr_quantity: number;

  constructor(attr_article: number, attr_quantity: number) {
    this.attr_article = attr_article;
    this.attr_quantity = attr_quantity;
  }
}

export interface PeriodicElement {
  artikelnummer: number;
  prod_menge: number;
  aufteilen: number;
}

let Element_Data: PeriodicElement[] = [
  { artikelnummer: 1, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 2, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 3, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 4, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 5, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 6, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 7, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 8, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 9, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 10, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 11, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 12, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 13, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 14, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 15, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 16, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 17, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 18, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 19, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 20, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 26, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 29, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 30, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 31, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 49, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 50, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 51, prod_menge: 9, aufteilen: 0},
  { artikelnummer: 54, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 55, prod_menge: 0, aufteilen: 0},
  { artikelnummer: 56, prod_menge: 0, aufteilen: 0},
];

@Component({
  selector: 'app-losgroessensplitting',
  templateUrl: './losgroessensplitting.component.html',
  styleUrls: ['./losgroessensplitting.component.css']
})

export class LosgroessensplittingComponent implements OnInit{
  attr_name!: string;
  attr_splitquant: number | undefined;

  @ViewChild('table')
  table!: MatTable<PeriodicElement[]>;

  displayedColumns: string[] = ['artikelnummer', 'prod_menge', 'aufteilen',];
  dataSource = Element_Data;

  productionlist$ = this.exportStore.pipe(select(selectProductionlist));
  productionlist: Production[] = [];

  constructor(private route: Router, private exportStore: Store<ExportState>){}

  dropTable(event: CdkDragDrop<PeriodicElement[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
  }

  ngOnInit(){

    if (browserRefresh) {
      this.route.navigate(['/simulation'])
    }

    // Produktionsmenge auslesen und in Tabelle eintragen
    this.productionlist$.subscribe((i) => (this.productionlist = i) );
    
    this.dataSource.forEach(article => {
      this.productionlist.forEach( i => {
        if(i.attr_article == article.artikelnummer){
          article.prod_menge += +i.attr_quantity;
        }
      })
    })

  }

  // newValue = Splitmenge, die unten angefügt werden muss 
  // Artikel ist die artikelnummer 
  split(newValue: number, artikel: number){ 

    this.dataSource.forEach( i => {
      if(i.artikelnummer == artikel){
        if(newValue < i.prod_menge ){
          i.prod_menge = i.prod_menge - newValue;
          this.dataSource.push({
            artikelnummer: artikel,
            prod_menge: newValue,
            aufteilen: 0,
          })
          this.table.renderRows();
        }
      }
    })
  }

  speichern(){
    const productionlist: Array<Production> = [];

    this.dataSource.forEach((d) => {
      const production = new Prodlist(d.artikelnummer, d.prod_menge);
    if (d.prod_menge !== 0) {
      productionlist.push(production);
    }
    });
    const prodlist: Productionlist = { production: productionlist };
    this.exportStore.dispatch(addProductionlist({ productionlist: prodlist }));
  }
}

