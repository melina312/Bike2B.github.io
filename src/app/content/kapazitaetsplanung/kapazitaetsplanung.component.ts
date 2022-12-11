import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ImportState } from 'src/app/store/import/import.reducer'
import { waitinglistworkstations, waiting_workplace, waitingliststock, waitinglist, ordersinwork} from 'src/app/model/import.model'
import { Productionlist, Production, Workingtime, Workingtimelist } from 'src/app/model/export.model';
import { selectWaitingListWorkstations, selectImportOrdersInWork } from 'src/app/store/import/import.selector';
import { addWorkingtimelist } from 'src/app/store/export/export.actions';
import { ExportState } from 'src/app/store/export/export.reducer';
import { selectProductionlist} from 'src/app/store/export/export.selector';
import { ThisReceiver } from '@angular/compiler';
import { browserRefresh } from '../../app.component';
import { Router } from '@angular/router';
import { count } from 'rxjs';
import { fadeInItems } from '@angular/material/menu';

export interface PeriodicElement {
  arbeitsplatz: number;
  kapa_bedarf: number;
  ruest_new: number;
  kapa_old: number;
  ruest_old: number;
  kapa_gesamt: number;
  anzahl_schichten: number;
  ueberstunden_min_tag: number;
  zusatz_ueberstunden: number;
}

var ELEMENT_DATA: PeriodicElement[] = [
  {arbeitsplatz: 1, kapa_bedarf: 0, ruest_new: 0, kapa_old: 0, ruest_old: 0, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 0,},
  {arbeitsplatz: 2, kapa_bedarf: 0, ruest_new: 0, kapa_old: 0, ruest_old: 0, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 0,},
  {arbeitsplatz: 3, kapa_bedarf: 0, ruest_new: 0, kapa_old: 0, ruest_old: 0, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 0,},
  {arbeitsplatz: 4, kapa_bedarf: 0, ruest_new: 0, kapa_old: 0, ruest_old: 0, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 0,},
  {arbeitsplatz: 6, kapa_bedarf: 0, ruest_new: 0, kapa_old: 0, ruest_old: 0, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 0,},
  {arbeitsplatz: 7, kapa_bedarf: 0, ruest_new: 0, kapa_old: 0, ruest_old: 0, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 0,},
  {arbeitsplatz: 8, kapa_bedarf: 0, ruest_new: 0, kapa_old: 0, ruest_old: 0, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 0,},
  {arbeitsplatz: 9, kapa_bedarf: 0, ruest_new: 0, kapa_old: 0, ruest_old: 0, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 0,},
  {arbeitsplatz: 10, kapa_bedarf: 0, ruest_new: 0, kapa_old: 0, ruest_old: 0, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 0,},
  {arbeitsplatz: 11, kapa_bedarf: 0, ruest_new: 0, kapa_old: 0, ruest_old: 0, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 0,},
  {arbeitsplatz: 12, kapa_bedarf: 0, ruest_new: 0, kapa_old: 0, ruest_old: 0, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 0,},
  {arbeitsplatz: 13, kapa_bedarf: 0, ruest_new: 0, kapa_old: 0, ruest_old: 0, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 0,},
  {arbeitsplatz: 14, kapa_bedarf: 0, ruest_new: 0, kapa_old: 0, ruest_old: 0, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 0,},
  {arbeitsplatz: 15, kapa_bedarf: 0, ruest_new: 0, kapa_old: 0, ruest_old: 0, kapa_gesamt: 0, anzahl_schichten: 1, ueberstunden_min_tag: 0, zusatz_ueberstunden: 0,},

];

export interface Ruestzeit {
  teil_nr: number;
  station1_ruestzeit?: number;
  station2_ruestzeit?: number;
  station3_ruestzeit?: number;
  station4_ruestzeit?: number;
  station6_ruestzeit?: number;
  station7_ruestzeit?: number;
  station8_ruestzeit?: number;
  station9_ruestzeit?: number;
  station10_ruestzeit?: number;
  station11_ruestzeit?: number;
  station12_ruestzeit?: number;
  station13_ruestzeit?: number;
  station14_ruestzeit?: number;
  station15_ruestzeit?: number;
  station1_bearbeitungszeit?: number;
  station2_bearbeitungszeit?: number;
  station3_bearbeitungszeit?: number;
  station4_bearbeitungszeit?: number;
  station6_bearbeitungszeit?: number;
  station7_bearbeitungszeit?: number;
  station8_bearbeitungszeit?: number;
  station9_bearbeitungszeit?: number;
  station10_bearbeitungszeit?: number;
  station11_bearbeitungszeit?: number;
  station12_bearbeitungszeit?: number;
  station13_bearbeitungszeit?: number;
  station14_bearbeitungszeit?: number;
  station15_bearbeitungszeit?: number;
}

var RUEST_ZEIT: Ruestzeit[] = [
  {teil_nr: 1, station4_ruestzeit: 30, station4_bearbeitungszeit: 6 },
  {teil_nr: 2, station4_ruestzeit: 20, station4_bearbeitungszeit: 7 }, 
  {teil_nr: 3, station4_ruestzeit: 30, station4_bearbeitungszeit: 7}, 
  {teil_nr: 4, station10_ruestzeit: 20, station11_ruestzeit: 10, station10_bearbeitungszeit: 4, station11_bearbeitungszeit: 3 },
  {teil_nr: 5, station10_ruestzeit: 20, station11_ruestzeit: 10, station10_bearbeitungszeit: 4, station11_bearbeitungszeit: 3 },
  {teil_nr: 6, station10_ruestzeit: 20, station11_ruestzeit: 10, station10_bearbeitungszeit: 4, station11_bearbeitungszeit: 3 },
  {teil_nr: 7, station10_ruestzeit: 20, station11_ruestzeit: 20, station10_bearbeitungszeit: 4, station11_bearbeitungszeit: 3 },
  {teil_nr: 8, station10_ruestzeit: 20, station11_ruestzeit: 20, station10_bearbeitungszeit: 4, station11_bearbeitungszeit: 3 },
  {teil_nr: 9, station10_ruestzeit: 20, station11_ruestzeit: 20, station10_bearbeitungszeit: 4, station11_bearbeitungszeit: 3 },
  {teil_nr: 10, station7_ruestzeit: 20, station8_ruestzeit: 15, station9_ruestzeit: 15, station12_ruestzeit: 0, station13_ruestzeit: 0 ,station7_bearbeitungszeit: 2, station8_bearbeitungszeit: 1, station9_bearbeitungszeit: 3,station12_bearbeitungszeit: 3, station13_bearbeitungszeit:2 },
  {teil_nr: 11, station7_ruestzeit: 20, station8_ruestzeit: 15, station9_ruestzeit: 15, station12_ruestzeit: 0, station13_ruestzeit: 0 ,station7_bearbeitungszeit: 2, station8_bearbeitungszeit: 2, station9_bearbeitungszeit: 3,station12_bearbeitungszeit: 3, station13_bearbeitungszeit:2 },
  {teil_nr: 12, station7_ruestzeit: 20, station8_ruestzeit: 15, station9_ruestzeit: 15, station12_ruestzeit: 0, station13_ruestzeit: 0 ,station7_bearbeitungszeit: 2, station8_bearbeitungszeit: 2, station9_bearbeitungszeit: 3,station12_bearbeitungszeit: 3, station13_bearbeitungszeit:2 },
  {teil_nr: 13, station7_ruestzeit: 20, station8_ruestzeit: 15, station9_ruestzeit: 15, station12_ruestzeit: 0, station13_ruestzeit: 0 ,station7_bearbeitungszeit: 2, station8_bearbeitungszeit: 1, station9_bearbeitungszeit: 3,station12_bearbeitungszeit: 3, station13_bearbeitungszeit:2 },
  {teil_nr: 14, station7_ruestzeit: 20, station8_ruestzeit: 15, station9_ruestzeit: 15, station12_ruestzeit: 0, station13_ruestzeit: 0 ,station7_bearbeitungszeit: 2, station8_bearbeitungszeit: 2, station9_bearbeitungszeit: 3,station12_bearbeitungszeit: 3, station13_bearbeitungszeit:2 },
  {teil_nr: 15, station7_ruestzeit: 20, station8_ruestzeit: 15, station9_ruestzeit: 15, station12_ruestzeit: 0, station13_ruestzeit: 0 ,station7_bearbeitungszeit: 2, station8_bearbeitungszeit: 2, station9_bearbeitungszeit: 3,station12_bearbeitungszeit: 3, station13_bearbeitungszeit:2 },
  {teil_nr: 16, station6_ruestzeit: 15, station14_ruestzeit: 0 , station6_bearbeitungszeit: 2 , station14_bearbeitungszeit: 3},
  {teil_nr: 17, station15_ruestzeit: 15, station15_bearbeitungszeit: 3},
  {teil_nr: 18, station6_ruestzeit: 15, station7_ruestzeit: 20, station8_ruestzeit: 20, station9_ruestzeit: 15, station6_bearbeitungszeit: 3, station7_bearbeitungszeit: 2, station8_bearbeitungszeit: 3, station9_bearbeitungszeit: 2 },
  {teil_nr: 19, station6_ruestzeit: 15, station7_ruestzeit: 20, station8_ruestzeit: 25, station9_ruestzeit: 20, station6_bearbeitungszeit: 3, station7_bearbeitungszeit: 2, station8_bearbeitungszeit: 3, station9_bearbeitungszeit: 2 },
  {teil_nr: 20, station6_ruestzeit: 15, station7_ruestzeit: 20, station8_ruestzeit: 20, station9_ruestzeit: 15, station6_bearbeitungszeit: 3, station7_bearbeitungszeit: 2, station8_bearbeitungszeit: 3, station9_bearbeitungszeit: 2 },
  {teil_nr: 26, station7_ruestzeit: 30, station15_ruestzeit: 15, station7_bearbeitungszeit: 2, station15_bearbeitungszeit: 3 },
  {teil_nr: 29, station1_ruestzeit: 20, station1_bearbeitungszeit: 6 },
  {teil_nr: 30, station2_ruestzeit: 20, station2_bearbeitungszeit: 5 },
  {teil_nr: 31, station3_ruestzeit: 20, station3_bearbeitungszeit: 6 },
  {teil_nr: 49, station1_ruestzeit: 20, station1_bearbeitungszeit: 6 },
  {teil_nr: 50, station2_ruestzeit: 30, station2_bearbeitungszeit: 5 },
  {teil_nr: 51, station3_ruestzeit: 20, station3_bearbeitungszeit: 5 },
  {teil_nr: 54, station1_ruestzeit: 20, station1_bearbeitungszeit: 6 },
  {teil_nr: 55, station2_ruestzeit: 30, station2_bearbeitungszeit: 5 },
  {teil_nr: 56, station3_ruestzeit: 20, station3_bearbeitungszeit: 6 }
];


@Component({
  selector: 'app-kapazitaetsplanung',
  templateUrl: './kapazitaetsplanung.component.html',
  styleUrls: ['./kapazitaetsplanung.component.css']
})
export class KapazitaetsplanungComponent {

  displayedColumns: string[] = ['arbeitsplatz', 'kapa_bedarf', 'ruest_new', 'kapa_old', 'ruest_old', 'kapa_gesamt', 'anzahl_schichten', 'ueberstunden_min_tag', 'zusatz_ueberstunden'];
  dataSource = ELEMENT_DATA;
  dataSourceLeadTimes = RUEST_ZEIT;

  production$ = this.exportstore.pipe(select(selectProductionlist));
  watinglistWorkstation$ = this.store.pipe(select(selectWaitingListWorkstations));
  orderInWork$ = this.store.pipe(select(selectImportOrdersInWork));

  data_production: Production[] | undefined
  total_waitinglist: waitinglist[] = [];
  data_waitingListWorkstations: waitinglistworkstations | undefined;
  data_ordersinwork: ordersinwork | undefined;


  constructor(private route: Router, private exportstore: Store<ExportState>, private store: Store<ImportState>){};

  ngOnInit(){
    if (browserRefresh) {
      this.route.navigate(['/simulation'])
    }

    this.production$.subscribe((i) => (this.data_production = i));
    this.watinglistWorkstation$.subscribe((i) => (this.data_waitingListWorkstations = i));
    this.orderInWork$.subscribe((i) => (this.data_ordersinwork = i));

    if(this.data_waitingListWorkstations != undefined){
      this.data_waitingListWorkstations!.workplace.forEach((workplace: waiting_workplace) => {
        const wt = workplace.waitinglist;
        if (!(workplace.waitinglist == undefined)) {
          if (Array.isArray(wt)) {
            this.total_waitinglist.push(...wt);
          } else {
            this.total_waitinglist.push(wt)
          }
        }
      });
    }
    
    this.insertKapabedarfNeu();
    this.insertRüstzeitenNeu();
    this.insertKapzitätenAlt();
    this.insertErgebnisKapaberechnung();
  }

  //Berechnet die Kapazitäten aus den neuen Produktionsaufträgen
  insertKapabedarfNeu () {
    if (this.data_production != undefined){
      //Kapzitaeten Sation 1 durch E29, E49 und E54
      this.dataSource[0].kapa_bedarf = this.calcKapa(21, this.dataSourceLeadTimes[21].station1_bearbeitungszeit!) + 
                                       this.calcKapa(24, this.dataSourceLeadTimes[24].station1_bearbeitungszeit!) + 
                                       this.calcKapa(27, this.dataSourceLeadTimes[27].station1_bearbeitungszeit!);
      //Kapazitaten Station 2 durch E30, E50 und E55
      this.dataSource[1].kapa_bedarf = this.calcKapa(22, this.dataSourceLeadTimes[22].station2_bearbeitungszeit!) + 
                                       this.calcKapa(25, this.dataSourceLeadTimes[25].station2_bearbeitungszeit!) + 
                                       this.calcKapa(28, this.dataSourceLeadTimes[28].station2_bearbeitungszeit!);
      //Kapazitaeten Sation 3 durch E31, E50 und E56
      this.dataSource[2].kapa_bedarf = this.calcKapa(23, this.dataSourceLeadTimes[23].station3_bearbeitungszeit!) + 
                                       this.calcKapa(26, this.dataSourceLeadTimes[26].station3_bearbeitungszeit!) + 
                                       this.calcKapa(29, this.dataSourceLeadTimes[29].station3_bearbeitungszeit!);
      //Kapazitaeten Station 4 durch P1, P2 und P3
      this.dataSource[3].kapa_bedarf = this.calcKapa(0, this.dataSourceLeadTimes[0].station4_bearbeitungszeit!) + 
                                       this.calcKapa(1, this.dataSourceLeadTimes[1].station4_bearbeitungszeit!) + 
                                       this.calcKapa(2, this.dataSourceLeadTimes[2].station4_bearbeitungszeit!);
      //Kapazitaeten Station 6 durch E16
      this.dataSource[4].kapa_bedarf = this.calcKapa(15, this.dataSourceLeadTimes[15].station6_bearbeitungszeit!);
      //Kapazitaeten Station 7 duruch E26
      this.dataSource[5].kapa_bedarf = this.calcKapa(20, this.dataSourceLeadTimes[20].station7_bearbeitungszeit!); 
      //Kapazitaeten Station 7, 8, 9, 12, 13 durch E10, bis E15 
      for (let index = 9; index <= 14; index++) {
        this.dataSource[5].kapa_bedarf += this.calcKapa(index, this.dataSourceLeadTimes[index].station7_bearbeitungszeit!);
        this.dataSource[7].kapa_bedarf += this.calcKapa(index, this.dataSourceLeadTimes[index].station9_bearbeitungszeit!);
        this.dataSource[10].kapa_bedarf += this.calcKapa(index, this.dataSourceLeadTimes[index].station12_bearbeitungszeit!);
        this.dataSource[11].kapa_bedarf += this.calcKapa(index, this.dataSourceLeadTimes[index].station13_bearbeitungszeit!);
        if (index != 9 && index != 12){
          this.dataSource[6].kapa_bedarf += this.calcKapa(index, this.dataSourceLeadTimes[index].station8_bearbeitungszeit!);
        }else {
          this.dataSource[6].kapa_bedarf += this.calcKapa(index, this.dataSourceLeadTimes[index].station8_bearbeitungszeit!);
        }
      }
      //Kapazitaeten Station 6, 7, 8 und 9 druch E18, bis E20
      for (let index = 17; index <= 19; index++) {
        this.dataSource[4].kapa_bedarf += this.calcKapa(index, this.dataSourceLeadTimes[index].station6_bearbeitungszeit!);
        this.dataSource[5].kapa_bedarf += this.calcKapa(index, this.dataSourceLeadTimes[index].station7_bearbeitungszeit!);
        this.dataSource[6].kapa_bedarf += this.calcKapa(index, this.dataSourceLeadTimes[index].station8_bearbeitungszeit!);
        this.dataSource[7].kapa_bedarf += this.calcKapa(index, this.dataSourceLeadTimes[index].station9_bearbeitungszeit!);
      }
      //Kapazitaeten Station 10 und 11 durch E4 bis E9
      for (let index = 3; index <= 8; index++) {
        this.dataSource[8].kapa_bedarf += this.calcKapa(index, this.dataSourceLeadTimes[index].station10_bearbeitungszeit!);
        this.dataSource[9].kapa_bedarf += this.calcKapa(index, this.dataSourceLeadTimes[index].station11_bearbeitungszeit!);
      }    
      //Kapazitaeten Sation 14 durch E16 
      this.dataSource[12].kapa_bedarf = this.calcKapa(15, this.dataSourceLeadTimes[15].station14_bearbeitungszeit!);
      //Kapazitaeten Sation 15 durch E17 und E26
      this.dataSource[13].kapa_bedarf = this.calcKapa(16, this.dataSourceLeadTimes[16].station15_bearbeitungszeit!) + 
                                        this.calcKapa(20, this.dataSourceLeadTimes[20].station15_bearbeitungszeit!);
      }
  }

  //Berechnet die Rüstzeiten aus den neuen Prosuktionsaufträgen
  insertRüstzeitenNeu(){
    if (this.data_production != undefined){
      //Rüstzeit neu Station 4 für P1, P2 und P3
      for (let index = 1; index <=2; index++) {
        if (this.data_production[index].attr_article != 0){
          this.dataSource[3].ruest_new += this.dataSourceLeadTimes[index].station4_ruestzeit!;
        }
      }

      //Rüstzeit neu Station 10 und 11 für E4, E5, E6, E7, E8, und E9
      for (let index = 4; index <= 8; index++) {
        if (this.data_production[index].attr_quantity != 0){
          this.dataSource[8].ruest_new += this.dataSourceLeadTimes[index].station10_ruestzeit!;
          this.dataSource[9].ruest_new += this.dataSourceLeadTimes[index].station11_ruestzeit!;
        }  
      }
      //Rüstzeit neu Station 7, 8, 9, 12 und 13 für E10, E11, E12, E13, E14, und E15
      for (let index = 10; index <= 14; index++) {
        if (this.data_production[index].attr_quantity != 0){
          this.dataSource[5].ruest_new += this.dataSourceLeadTimes[index].station7_ruestzeit!;
          this.dataSource[6].ruest_new += this.dataSourceLeadTimes[index].station8_ruestzeit!;
          this.dataSource[7].ruest_new += this.dataSourceLeadTimes[index].station9_ruestzeit!;
          this.dataSource[10].ruest_new += this.dataSourceLeadTimes[index].station12_ruestzeit!;
          this.dataSource[11].ruest_new += this.dataSourceLeadTimes[index].station13_ruestzeit!;
        }  
      }
      
      //Rüstzeit neu Station 6, 7, 8, und 9 für E18, E19 und E20
      for (let index = 17; index <= 19; index++) {
        if (this.data_production[index].attr_quantity != 0){
          this.dataSource[4].ruest_new += this.dataSourceLeadTimes[index].station6_ruestzeit!;
          this.dataSource[5].ruest_new += this.dataSourceLeadTimes[index].station7_ruestzeit!;
          this.dataSource[6].ruest_new += this.dataSourceLeadTimes[index].station8_ruestzeit!;
          this.dataSource[7].ruest_new += this.dataSourceLeadTimes[index].station9_ruestzeit!;
        }
      }
      //Rüstzeit neu Station 7 und 15 für E26
      if (this.data_production[20].attr_quantity != 0){
        this.dataSource[5].ruest_new += this.dataSourceLeadTimes[20].station7_ruestzeit!;
        this.dataSource[13].ruest_new += this.dataSourceLeadTimes[20].station15_ruestzeit!;
      }
    
      //Rüstzeit neu Station 1 für E49
      if (this.data_production[24].attr_quantity != 0 && this.data_production[21].attr_quantity != 0){
        this.dataSource[0].ruest_new += this.dataSourceLeadTimes[24].station1_ruestzeit!;
      }
      //Rüstzeit neu Station 2 für E50
      if (this.data_production[25].attr_quantity != 0 && this.data_production[22].attr_quantity != 0){
        this.dataSource[1].ruest_new += this.dataSourceLeadTimes[25].station2_ruestzeit!;
      }
      //Rüstzeit neu Station 3 für E51 
      if (this.data_production[26].attr_quantity != 0 && this.data_production[23].attr_quantity != 0){
        this.dataSource[2].ruest_new += this.dataSourceLeadTimes[26].station3_ruestzeit!;
      }
      //Rüstzeit neu Station 1 für E54
      if (this.data_production[27].attr_quantity != 0 && this.data_production[24].attr_quantity != 0){
        this.dataSource[0].ruest_new += this.dataSourceLeadTimes[27].station1_ruestzeit!;
      }
      //Rüstzeit neu Station 2 für E55
      if (this.data_production[28].attr_quantity != 0 && this.data_production[25].attr_quantity != 0 ){
        this.dataSource[1].ruest_new += this.dataSourceLeadTimes[28].station2_ruestzeit!;
      }
      //Rüstzeit neu Station 3 für E56
      if (this.data_production[29].attr_quantity != 0 && this.data_production[26].attr_quantity != 0){
        this.dataSource[2].ruest_new += this.dataSourceLeadTimes[29].station3_ruestzeit!;
      }
    }
  }

  //Berechnet die Kapazitäten aus den Wartenschlagnen und Aufträgen in Bearbeitung
  insertKapzitätenAlt() {
    if (this.data_waitingListWorkstations?.workplace != undefined){
      this.data_waitingListWorkstations.workplace.forEach((element, index)=> {
        //Kapaitaten aus Wartelisten für Sation 1, 2, 3 und 4 berechnen
        if (index <= 3){
          this.dataSource[index].kapa_old += Math.round(element.timeneed)
        }
        //Kapazitäten aus Wartelisten für Station 9, 11, 14 und 15 berechnen
        if (index == 8 || index == 10 || (index >= 13 && index <= 14)){
          this.dataSource[index - 1].kapa_old += Math.round(element.timeneed)
        }
        //Kapazitäten aus Wartelisten für Station 6 berechen
        if (index == 5 && element.waitinglist != undefined) {
          if (Array.isArray(element.waitinglist))  {
            element.waitinglist.forEach(item=> {
              if (item.item == 16) {
                this.dataSource[index -1].kapa_old += Math.round(item.timeneed);
                this.dataSource[12].kapa_old += Math.round((item.timeneed/2)*3); 
              } else if(item.item >= 18 && item.item <= 20){
                this.dataSource[index -1].kapa_old += Math.round(item.timeneed);
                this.dataSource[5].kapa_old += Math.round((item.timeneed/3)* 2);
                this.dataSource[6].kapa_old += Math.round(item.timeneed);
                this.dataSource[7].kapa_old += Math.round((item.timeneed/3)* 2);
              }
            });
          } else {
            let temp_waitinglist = element.waitinglist as waitinglist;
            if (temp_waitinglist.item == 16){
              this.dataSource[index -1].kapa_old += Math.round(temp_waitinglist.timeneed);
              this.dataSource[12].kapa_old += Math.round((temp_waitinglist.timeneed/2)*3);
            }
            else if(temp_waitinglist.item >= 18 && temp_waitinglist.item <= 20){
              this.dataSource[index -1].kapa_old += Math.round(temp_waitinglist.timeneed);
              this.dataSource[5].kapa_old += Math.round((temp_waitinglist.timeneed/3)* 2);
              this.dataSource[6].kapa_old += Math.round(temp_waitinglist.timeneed);
              this.dataSource[7].kapa_old += Math.round((temp_waitinglist.timeneed/3)* 2);
            }
          }
        }
        //Kapaziäten aus Wartelisten für Sation 7 berechnen
        if (index == 6 && element.waitinglist != undefined)  {
          if (Array.isArray(element.waitinglist))  {
            element.waitinglist.forEach(item=> {
              if (item.item <= 15){
                this.dataSource[index -1].kapa_old += Math.round(item.timeneed);
                this.dataSource[7].kapa_old += Math.round((item.timeneed/2) * 3);
              } else if (item.item > 15 && item.item <= 20) {
                this.dataSource[index -1].kapa_old += Math.round(item.timeneed);
                this.dataSource[7].kapa_old += Math.round(item.timeneed);
              } else {
                this.dataSource[index -1].kapa_old += Math.round(item.timeneed);
                this.dataSource[13].kapa_old += Math.round((item.timeneed/2) * 3);
              }
            });
          } else {
            let temp_waitinglist = element.waitinglist as waitinglist;
            if (temp_waitinglist.item <=15){
              this.dataSource[index -1].kapa_old += Math.round(temp_waitinglist.timeneed);
              this.dataSource[7].kapa_old += Math.round((temp_waitinglist.timeneed/2) * 3);
            }
            else if (temp_waitinglist.item > 15 && temp_waitinglist.item <=20){
              this.dataSource[index -1].kapa_old += Math.round(temp_waitinglist.timeneed);
              this.dataSource[7].kapa_old += Math.round(temp_waitinglist.timeneed);
            } else {
              this.dataSource[index -1].kapa_old += Math.round(temp_waitinglist.timeneed);
              this.dataSource[13].kapa_old += Math.round((temp_waitinglist.timeneed/2) * 3);
            }
          }
        }
        //Kapazitäten aus Wartelisten für Sation 8 berechnen
        if (index == 7 && element.waitinglist != undefined) {
          if (Array.isArray(element.waitinglist))  {
            element.waitinglist.forEach((item) => {
              if (item.item == 10 || item.item == 13){
                this.dataSource[index - 1].kapa_old += Math.round(item.timeneed);
                this.dataSource[7].kapa_old += Math.round(item.timeneed * 3);
                this.dataSource[5].kapa_old += Math.round(item.timeneed * 2); 
              } else if (item.item == 11 || item.item == 12 ||(item.item > 13 && item.item <=15)){
                this.dataSource[index -1].kapa_old += Math.round(item.timeneed);
                this.dataSource[7].kapa_old += Math.round((item.timeneed/2) * 3);
                this.dataSource[5].kapa_old += Math.round(item.timeneed);
              } else {
                this.dataSource[index -1].kapa_old += Math.round(item.timeneed);
                this.dataSource[7].kapa_old += Math.round((item.timeneed/3) * 2);
                this.dataSource[5].kapa_old += Math.round((item.timeneed/3) * 2);
              }
            });
          } else {
            let temp_waitinglist = element.waitinglist as waitinglist;
            if (temp_waitinglist.item == 10 || temp_waitinglist.item == 13){
              this.dataSource[index -1].kapa_old += Math.round(temp_waitinglist.timeneed);
              this.dataSource[7].kapa_old += Math.round(temp_waitinglist.timeneed * 3);
              this.dataSource[5].kapa_old += Math.round(temp_waitinglist.timeneed * 2);
            } else if(temp_waitinglist.item == 11 || temp_waitinglist.item == 12 ||(temp_waitinglist.item > 13 && temp_waitinglist.item <=15)){
              this.dataSource[index -1].kapa_old += Math.round(temp_waitinglist.timeneed);
              this.dataSource[7].kapa_old += Math.round((temp_waitinglist.timeneed/2)* 3);
              this.dataSource[5].kapa_old += temp_waitinglist.timeneed
            } else{
              this.dataSource[index -1].kapa_old += Math.round(temp_waitinglist.timeneed);
              this.dataSource[7].kapa_old += Math.round((temp_waitinglist.timeneed/3)* 2);
              this.dataSource[5].kapa_old += Math.round((temp_waitinglist.timeneed/3)* 2);
            }
        }
        }

        //Kapazitäten aus Wartelisten für Station 10 berechnen
        if (index == 9 && element.waitinglist != undefined){
          if (Array.isArray(element.waitinglist))  {
            element.waitinglist.forEach(item => {
              this.dataSource[index -1].kapa_old += Math.round(item.timeneed);
              this.dataSource[9].kapa_old += Math.round((item.timeneed/4) * 3); 
            });
          } else {
            let temp_waitinglist = element.waitinglist as waitinglist;
            this.dataSource[index -1].kapa_old += Math.round(temp_waitinglist.timeneed);
            this.dataSource[9].kapa_old += Math.round((temp_waitinglist.timeneed/4) * 3);
          }
        }
        //Kapazitäten aus Wartelisten für Station 12 berechnen
        if (index == 11 && element.waitinglist != undefined){
          if (Array.isArray(element.waitinglist))  {
            element.waitinglist.forEach(item => {
              if (item.item == 11 || item.item == 13) {
                this.dataSource[index -1].kapa_old += Math.round(item.timeneed);
                this.dataSource[6].kapa_old += Math.round(item.timeneed/3);
                this.dataSource[5].kapa_old += Math.round((item.timeneed/3)* 2);
                this.dataSource[7].kapa_old += Math.round(item.timeneed);
              } else {
                this.dataSource[index -1].kapa_old += Math.round(item.timeneed);
                this.dataSource[6].kapa_old += Math.round((item.timeneed/3) *2);
                this.dataSource[5].kapa_old += Math.round((item.timeneed/3)* 2);
                this.dataSource[7].kapa_old += Math.round(item.timeneed);
              }
            });
          } else {
            let temp_waitinglist = element.waitinglist as waitinglist;
            if (temp_waitinglist.item == 11 || temp_waitinglist.item == 13) {
              this.dataSource[index].kapa_old += Math.round(temp_waitinglist.timeneed);
              this.dataSource[6].kapa_old += Math.round(temp_waitinglist.timeneed/3);
              this.dataSource[5].kapa_old += Math.round((temp_waitinglist.timeneed/3)* 2);
              this.dataSource[7].kapa_old += Math.round(temp_waitinglist.timeneed);
            } else {
              this.dataSource[index].kapa_old += Math.round(temp_waitinglist.timeneed);
              this.dataSource[6].kapa_old += Math.round((temp_waitinglist.timeneed/3) * 2);
              this.dataSource[5].kapa_old += Math.round((temp_waitinglist.timeneed/3)* 2);
              this.dataSource[7].kapa_old += Math.round(temp_waitinglist.timeneed);
            }
          }
        }
        //Kapazitäten aus Wartelisten für Station 13 berechnen
        if (index == 12 && element.waitinglist != undefined){
          if (Array.isArray(element.waitinglist))  {
            element.waitinglist.forEach(item => {

              if (item.item == 11 || item.item == 13) {
                this.dataSource[index -1].kapa_old += Math.round(item.timeneed);
                this.dataSource[10].kapa_old += Math.round((item.timeneed/2)* 3);
                this.dataSource[6].kapa_old += Math.round(item.timeneed/2);
                this.dataSource[5].kapa_old += Math.round(item.timeneed);
                this.dataSource[7].kapa_old += Math.round((item.timeneed/2)* 3);
              } else {
                this.dataSource[index -1].kapa_old += Math.round(item.timeneed);
                this.dataSource[10].kapa_old += Math.round((item.timeneed/2)* 3);
                this.dataSource[6].kapa_old += Math.round(item.timeneed);
                this.dataSource[5].kapa_old += Math.round(item.timeneed);
                this.dataSource[7].kapa_old += Math.round((item.timeneed/2)* 3);
              }
            });
          } else {
            let temp_waitinglist = element.waitinglist as waitinglist;
            if (temp_waitinglist.item == 11 || temp_waitinglist.item == 13) {
              this.dataSource[index].kapa_old += Math.round(temp_waitinglist.timeneed);
              this.dataSource[10].kapa_old += Math.round((temp_waitinglist.timeneed/2) *3);
              this.dataSource[6].kapa_old += Math.round(temp_waitinglist.timeneed/2);
              this.dataSource[5].kapa_old += Math.round(temp_waitinglist.timeneed);
              this.dataSource[7].kapa_old += Math.round((temp_waitinglist.timeneed/2)* 3);
            } else {
              this.dataSource[index].kapa_old += Math.round(temp_waitinglist.timeneed);;
              this.dataSource[10].kapa_old += Math.round((temp_waitinglist.timeneed/2) *3);
              this.dataSource[6].kapa_old += Math.round(temp_waitinglist.timeneed);
              this.dataSource[5].kapa_old += Math.round(temp_waitinglist.timeneed);
              this.dataSource[7].kapa_old += Math.round((temp_waitinglist.timeneed/2)* 3);
            }
          }
        }
      });
    }
    if (this.data_ordersinwork?.workplace != undefined ){
      this.data_ordersinwork.workplace.forEach((item) => {
        //Kapazitäten aus Aufträgen noch an Station 1 - 4 berechnen
        if(item.id <= 4){
          this.dataSource[item.id -1].kapa_old += Math.round(item.timeneed);
        }
        //Kapazitäten aus Aufträgen noch an Staion 9, 11, 14, 15 berechnen
        if(item.id == 9 || item.id == 11 || item.id == 14 || item.id == 15) { 
          console.log(this.dataSource[item.id -2]);
          
          this.dataSource[item.id - 2].kapa_old += Math.round(item.timeneed);
        }
        //Kapazitäten aus Aufträgen noch an Station 6 berechnen 
        if (item.id == 6){ 
          if(item.item == 16){
            this.dataSource[item.id - 2].kapa_old += Math.round(item.timeneed);
            this.dataSource[12].kapa_old += Math.round((item.timeneed/2 *3));
          }else if (item.item >= 18 && item.item <= 20) {
            this.dataSource[item.id - 2].kapa_old += Math.round(item.timeneed);
            this.dataSource[5].kapa_old += Math.round((item.timeneed/3)* 2);
            this.dataSource[6].kapa_old += Math.round(item.timeneed);
            this.dataSource[7].kapa_old += Math.round((item.timeneed/3)* 2);
          }
        }
        //Kapazitäten aus Aufträgen noch an Sation 7 berechnen
        if (item.id == 7){
          if (item.item <= 15){
            this.dataSource[item.id - 2].kapa_old += Math.round(item.timeneed);
            this.dataSource[7].kapa_old += Math.round((item.timeneed/2) * 3);
          }else if (item.item > 15 && item.item <= 20) {
            this.dataSource[item.id - 2].kapa_old += Math.round(item.timeneed);
            this.dataSource[7].kapa_old += Math.round(item.timeneed);
          }else {
            this.dataSource[item.id - 2].kapa_old += Math.round(item.timeneed);
            this.dataSource[13].kapa_old += Math.round((item.timeneed/2) * 3);
          }
        }
        //Kapazitäten aus Aufträgen noch an Sation 8 berechnen
        if (item.id == 8) {
          if (item.item == 10 || item.item == 13){
            this.dataSource[item.id - 2].kapa_old += Math.round(item.timeneed);
            this.dataSource[7].kapa_old += Math.round(item.timeneed * 3);
            this.dataSource[5].kapa_old += Math.round(item.timeneed * 2); 
          }else if (item.item == 11 || item.item == 12 ||(item.item > 13 && item.item <=15)){
            this.dataSource[item.id - 2].kapa_old += Math.round(item.timeneed);
            this.dataSource[7].kapa_old += Math.round((item.timeneed/2) * 3);
            this.dataSource[5].kapa_old += Math.round(item.timeneed);
          }else {
            this.dataSource[item.id - 2].kapa_old += Math.round(item.timeneed);
            this.dataSource[7].kapa_old += Math.round((item.timeneed/3) * 2);
            this.dataSource[5].kapa_old += Math.round((item.timeneed/3) * 2);
          }
        }
       //Kapazitäten aus Aufträgen noch an Sation 10 berechnen
       if (item.id == 10) {
        this.dataSource[item.id - 2].kapa_old += Math.round(item.timeneed);
        this.dataSource[9].kapa_old += Math.round((item.timeneed/4) * 3); 
      }
      //Kapazitäten aus Aufträgen noch an Sation 12 berechnen
       if (item.id == 12) {
        if (item.item == 11 || item.item == 13) {
          this.dataSource[item.id - 2].kapa_old += Math.round(item.timeneed);
          this.dataSource[6].kapa_old += Math.round(item.timeneed/3);
          this.dataSource[5].kapa_old += Math.round((item.timeneed/3)* 2);
          this.dataSource[7].kapa_old += Math.round(item.timeneed);
        } else {
          this.dataSource[item.id - 2].kapa_old += Math.round(item.timeneed);
          this.dataSource[6].kapa_old += Math.round((item.timeneed/3) *2);
          this.dataSource[5].kapa_old += Math.round((item.timeneed/3)* 2);
          this.dataSource[7].kapa_old += Math.round(item.timeneed);
        }
       }
        //Kapazitäten aus Aufträgen noch an Sation 13 berechnen
        if (item.id == 13) {
          if (item.item == 11 || item.item == 13) {
            this.dataSource[item.id - 2].kapa_old += Math.round(item.timeneed);
            this.dataSource[10].kapa_old += Math.round((item.timeneed/2)* 3);
            this.dataSource[6].kapa_old += Math.round(item.timeneed/2);
            this.dataSource[5].kapa_old += Math.round(item.timeneed);
            this.dataSource[7].kapa_old += Math.round((item.timeneed/2)* 3);
          } else {
            this.dataSource[item.id - 2].kapa_old += Math.round(item.timeneed);
            this.dataSource[10].kapa_old += Math.round((item.timeneed/2)* 3);
            this.dataSource[6].kapa_old += Math.round(item.timeneed);
            this.dataSource[5].kapa_old += Math.round(item.timeneed);
            this.dataSource[7].kapa_old += Math.round((item.timeneed/2)* 3);
          }
        }
      });
    }
  }
  
  //berechnet die Rüstzeiten die durch Warteschlangen entstehne
  ///TODO: Noch berechnen fehlt noch 
  insertRüstzeitenAlt() {
    this.total_waitinglist.forEach((item) => {

    });
  }

  insertErgebnisKapaberechnung(){
    this.dataSource.forEach(item => {
      item.kapa_gesamt = item.kapa_bedarf + item.ruest_new + item.kapa_old + item.ruest_old + (item.zusatz_ueberstunden * 5);
      let anzhalSchichten: number = item.kapa_gesamt / 2400;
      if (anzhalSchichten >= 1.5 && anzhalSchichten <= 2.5) {
        item.anzahl_schichten = 2;
      } else if (anzhalSchichten >=2.5){
        item.anzahl_schichten = 3;
      }
      if(item.anzahl_schichten == 1 && item.kapa_gesamt >= 2400){
        item.ueberstunden_min_tag = (item.kapa_gesamt - 2400)/5;
      } else if (item.anzahl_schichten == 2 && item.kapa_gesamt >= 4800){
        item.ueberstunden_min_tag = Math.round((item.kapa_gesamt - 4800)/5);
      } else if (item.kapa_bedarf > 6200) {
        console.log(`Arbteitsplatz ${item.arbeitsplatz} benötigt ${item.kapa_bedarf - 6200} mehr Kapazität als verfügbar`)
        console.log("In  dem Fall noch Infobutton hinzufügen das bei 3 Schichten keine Überstunden möglich sind wenn noch Zeti"); 
      }
    });
  }

  //Parameter: Index eins Artikels im Export Store, Bearbeitungszeit an einer Station
  //Gibt den Zeitaufwand den das Bearbeiten des Artikels an der angegegeben Station kostet zurück
  calcKapa(art_indx: number, station_time: number): number{
    if (this.data_production != undefined){
    return this.data_production[art_indx].attr_quantity *  station_time;
    } else {
      return 0;
    }
  }
  change(newValue: number, arbeitsplatz: number){
    this.dataSource.forEach(element=>{
      if (element.arbeitsplatz == arbeitsplatz){
        element.zusatz_ueberstunden = newValue;
      }
    });
    this.insertErgebnisKapaberechnung();
  }

  //Speichern der Arbeitszeiten im Export Store bei klick auf weiter
  speichern() {
    const list_arbeitszeiten: Workingtime[] = [];

    this.dataSource.forEach(item => {
      const arbeitzeiten_arbeitsplatz: Workingtime = {attr_station: item.arbeitsplatz, attr_shift: item.anzahl_schichten,
                                                      attr_overtime: item.ueberstunden_min_tag}
      list_arbeitszeiten.push(arbeitzeiten_arbeitsplatz);
    })

    let workingtimelist: Workingtimelist = { workingtime: list_arbeitszeiten };

    console.log("Arbeitszeiten");
    console.log(workingtimelist);

    this.exportstore.dispatch(addWorkingtimelist({workingtimelist: workingtimelist}));
  } 
}
