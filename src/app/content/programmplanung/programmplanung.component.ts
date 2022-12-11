import { Component } from '@angular/core';
import { Daten } from 'src/app/daten';
import { select, Store } from '@ngrx/store';
import { selectImportResults, selectImportForecast, selectWaitingListWorkstations, selectImportOrdersInWork, selectImportWarehousestock } from 'src/app/store/import/import.selector';
import { ImportState } from 'src/app/store/import/import.reducer';
import { forecast, Results, waitinglist, waitinglistworkstations, waiting_workplace, ordersinwork, orders_workplace, warehousestock } from 'src/app/model/import.model';
import { Sellwish, Item, Item2, Selldirect, Production, Productionlist } from 'src/app/model/export.model';
import { ExportState } from 'src/app/store/export/export.reducer';
import { addProductionlist, addSelldirect, addSellwish, addSellwishItem } from 'src/app/store/export/export.actions';
import { selectSellWish, selectWishList } from 'src/app/store/export/export.selector';
import { browserRefresh } from '../../app.component';
import { Router } from '@angular/router';

export interface Endprodukte {
  artikelnummer: number;
  aktueller_lagerbestand: number;
  in_bearbeitung: number;
  in_warteschlange: number;
  geplanter_endbestand: number;
  vertriebswunsch: number;
  direktverkauf: number;
  produktionsauftraege: number;
  bedarfsmenge: number;
}

var endprodukt_p1: Endprodukte[] = [
  { artikelnummer: 1, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 26, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 51, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
 
  { artikelnummer: 16, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 17, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 50, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
 
  { artikelnummer: 4, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 10, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 49, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  
  { artikelnummer: 7, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 13, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 18, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
];

var endprodukt_p2: Endprodukte[] = [
  { artikelnummer: 2, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 26, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 56, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
 
  { artikelnummer: 16, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 17, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 55, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
 
  { artikelnummer: 5, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 11, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 54, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  
  { artikelnummer: 8, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 14, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 19, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
];

var endprodukt_p3: Endprodukte[] = [
  { artikelnummer: 3, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 26, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 31, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
 
  { artikelnummer: 16, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 17, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 30, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
 
  { artikelnummer: 6, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 12, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 29, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  
  { artikelnummer: 9, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 15, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
  { artikelnummer: 20, aktueller_lagerbestand: 0, in_bearbeitung: 0, in_warteschlange: 0, geplanter_endbestand: 100, vertriebswunsch: 0, direktverkauf: 0, produktionsauftraege: 0, bedarfsmenge: 0 },
];

@Component({
  selector: 'app-programmplanung',
  templateUrl: './programmplanung.component.html',
  styleUrls: ['./programmplanung.component.css']
})


export class ProgrammplanungComponent {

  Vabsatzplan_p1: number = 0;
  Vabsatzplan_p2: number = 0;
  Vabsatzplan_p3: number = 0;

  forecast$ = this.store.pipe(select(selectImportForecast));
  waitingListWorkstations$ = this.store.pipe(select(selectWaitingListWorkstations));
  ordersInWork$ = this.store.pipe(select(selectImportOrdersInWork));
  warehousestock$ = this.store.pipe(select(selectImportWarehousestock));
  sellwish$ = this.exportstore.pipe(select(selectSellWish));
  directSells$ = this.exportstore.pipe(select(selectWishList)); 


  displayedColumns: string[] = ['artikelnummer', 'vertriebswunsch', 'direktverkauf', 'aktueller_lagerbestand', 'in_bearbeitung', 'in_warteschlange', 'geplanter_endbestand', 'produktionsauftraege'];
  
  dataSourceP1 = endprodukt_p1;
  dataSourceP2 = endprodukt_p2;
  dataSourceP3 = endprodukt_p3;

  total_waitinglist: waitinglist[] = [];
  data_waitingListWorkstations: waitinglistworkstations | undefined;
  data_ordersinwork: ordersinwork | undefined;
  data_warehousestock: warehousestock | undefined;
  data_sellwish: Sellwish | undefined;
  data_directSales: Selldirect | undefined;

  constructor(private route: Router, public D: Daten, private store : Store<ImportState>, private exportstore: Store<ExportState>,){
  }

//////////// Werte auslesen //////////////////////

  ngOnInit(){

    if (browserRefresh) {
      this.route.navigate(['/simulation'])
    }
  // Vertriebswunsch in Tabelle einsetzen aus XML

   // let data: forecast | undefined;
   // this.forecast$.forEach( i => data = i)

   // this.Vabsatzplan_p1 = data!.p1;
   // endprodukt_p1[0].vertriebswunsch = data!.p1;
   // this.Vabsatzplan_p2 = data!.p2;
   // endprodukt_p2[0].vertriebswunsch = data!.p2;
   // this.Vabsatzplan_p3 = data!.p3;
   // endprodukt_p3[0].vertriebswunsch = data!.p3;

    this.sellwish$.subscribe((i) => (this.data_sellwish = i));
    this.directSells$.subscribe((i) => (this.data_directSales = i));

    if (this.data_sellwish != undefined) {
      console.log("Vertriebswunsch Atrikel 1");
      console.log(this.data_sellwish.item[0].attr_quantity);
      this.Vabsatzplan_p1 = this.data_sellwish.item[0].attr_quantity;
      this.dataSourceP1[0].vertriebswunsch = this.data_sellwish.item[0].attr_quantity;
      this.Vabsatzplan_p2 = this.data_sellwish.item[1].attr_quantity;
      this.dataSourceP2[0].vertriebswunsch = this.data_sellwish.item[1].attr_quantity;
      this.Vabsatzplan_p3 = this.data_sellwish.item[2].attr_quantity;
      this.dataSourceP3[0].vertriebswunsch = this.data_sellwish.item[2].attr_quantity;
     }
    if (this.data_directSales  != undefined) {
        this.dataSourceP1[0].direktverkauf = this.data_directSales.item[0].attr_quantity;
        this.dataSourceP2[0].direktverkauf = this.data_directSales.item[1].attr_quantity;
        this.dataSourceP3[0].direktverkauf = this.data_directSales.item[2].attr_quantity;
    }


  // in Warteschlange aus XML
    this.waitingListWorkstations$.subscribe((i) => (this.data_waitingListWorkstations = i) );
    
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
       
      //in Tabelle P3 einsetzen
      this.dataSourceP3.forEach(article => {
        this.total_waitinglist.forEach(waitingelement => { 
          if(waitingelement.item == article.artikelnummer){
            if(article.artikelnummer == 16 || article.artikelnummer == 17 || article.artikelnummer == 26){
              article.in_warteschlange += +waitingelement.amount;
            }else{
              article.in_warteschlange += +waitingelement.amount;
            }
          }
        });
      });

      //in Tabelle P2 einsetzen
      this.dataSourceP2.forEach(article => {
        this.total_waitinglist.forEach(waitingelement => { 
          if(waitingelement.item == article.artikelnummer){
            if(article.artikelnummer == 16 || article.artikelnummer == 17 || article.artikelnummer == 26){
              article.in_warteschlange += +waitingelement.amount;
            }else{
              article.in_warteschlange += +waitingelement.amount;
            }
          }
        });
      });

      //in Tabelle P1 einsetzen
      this.dataSourceP1.forEach(article => {
        this.total_waitinglist.forEach(waitingelement => { 
          if(waitingelement.item == article.artikelnummer){
            if(article.artikelnummer == 16 || article.artikelnummer == 17 || article.artikelnummer == 26){
              article.in_warteschlange += +waitingelement.amount;
            }else{
              article.in_warteschlange += +waitingelement.amount;
            }
          }
        });
      });
      
    }

  ///////////////// Bedarfsmenge übertragen ///////////////////////

  //in Tabelle P1 einsetzen
  this.dataSourceP1.forEach(article => {
    if(article.artikelnummer == 26 || article.artikelnummer == 51){
      article.direktverkauf = this.dataSourceP1[0].in_warteschlange;
    }else if(article.artikelnummer == 16 || article.artikelnummer == 17 || article.artikelnummer == 50){
      article.direktverkauf = this.dataSourceP1[2].in_warteschlange;
    }else if (article.artikelnummer == 4 || article.artikelnummer == 10 || article.artikelnummer == 49){
      article.direktverkauf = this.dataSourceP1[5].in_warteschlange;
    }else if (article.artikelnummer == 7 || article.artikelnummer == 13 || article.artikelnummer == 18){
      article.direktverkauf = this.dataSourceP1[8].in_warteschlange;
    }
  });

  //in Tabelle P2 einsetzen
  this.dataSourceP2.forEach(article => {
    if(article.artikelnummer == 26 || article.artikelnummer == 56){
      article.direktverkauf = this.dataSourceP2[0].in_warteschlange;
    }else if(article.artikelnummer == 16 || article.artikelnummer == 17 || article.artikelnummer == 55){
      article.direktverkauf = this.dataSourceP2[2].in_warteschlange;
    }else if (article.artikelnummer == 5 || article.artikelnummer == 11 || article.artikelnummer == 54){
      article.direktverkauf = this.dataSourceP2[5].in_warteschlange;
    }else if (article.artikelnummer == 8 || article.artikelnummer == 14 || article.artikelnummer == 19){
      article.direktverkauf = this.dataSourceP2[8].in_warteschlange;
    }
  });

  //in Tabelle P3 einsetzen
  this.dataSourceP3.forEach(article => {
    if(article.artikelnummer == 26 || article.artikelnummer == 51){
      article.direktverkauf = this.dataSourceP3[0].in_warteschlange;
    }else if(article.artikelnummer == 16 || article.artikelnummer == 17 || article.artikelnummer == 30){
      article.direktverkauf = this.dataSourceP3[2].in_warteschlange;
    }else if (article.artikelnummer == 6 || article.artikelnummer == 12 || article.artikelnummer == 29){
      article.direktverkauf = this.dataSourceP3[5].in_warteschlange;
    }else if (article.artikelnummer == 9 || article.artikelnummer == 15 || article.artikelnummer == 20){
      article.direktverkauf = this.dataSourceP3[8].in_warteschlange;
    }
  });

  // in Bearbeitung aus XML auslesen 
    this.ordersInWork$.subscribe((i) => (this.data_ordersinwork = i) );
    
    if(this.data_ordersinwork != undefined){
      //in Tabelle P3 einsetzen
      this.dataSourceP3.forEach(article => {
        this.data_ordersinwork!.workplace.forEach(workp => {
          if(workp.item == article.artikelnummer){
            article.in_bearbeitung += +workp.amount;
          }
        });
      });
      //in Tabelle P2 einsetzen
      this.dataSourceP2.forEach(article => {
        this.data_ordersinwork!.workplace.forEach(workp => {
          if(workp.item == article.artikelnummer){
            article.in_bearbeitung += +workp.amount;
          }
        });
      });
      // in Tabelle 1 einsetzen
        this.dataSourceP1.forEach(article => {
          this.data_ordersinwork!.workplace.forEach(workp => {
            if(workp.item == article.artikelnummer){
              article.in_bearbeitung += +workp.amount;
            }
          });
      });
    }

    // aktueller Lagerbestand aus XML auslesen 
    this.warehousestock$.subscribe((i) => (this.data_warehousestock = i) );
    
    if(this.data_warehousestock != undefined){
      //in Tabelle P3 einsetzen
      this.dataSourceP3.forEach(article => {
        this.data_warehousestock!.article.forEach(lager => {
          if(lager.id == article.artikelnummer){
            if(article.artikelnummer == 16 || article.artikelnummer == 17 || article.artikelnummer == 26){
              article.aktueller_lagerbestand += (+lager.amount/3);
            }else{
              article.aktueller_lagerbestand += +lager.amount;
            }
          }
        });
      });
      //in Tabelle P2 einsetzen
      this.dataSourceP2.forEach(article => {
        this.data_warehousestock!.article.forEach(lager => {
          if(lager.id == article.artikelnummer){
            if(article.artikelnummer == 16 || article.artikelnummer == 17 || article.artikelnummer == 26){
              article.aktueller_lagerbestand += (+lager.amount/3);
            }else{
              article.aktueller_lagerbestand += +lager.amount;
            }
          }
        });
      });
      //in Tabelle P1 einsetzen
      this.dataSourceP1.forEach(article => {
        this.data_warehousestock!.article.forEach(lager => {
          if(lager.id == article.artikelnummer){
            if(article.artikelnummer == 16 || article.artikelnummer == 17 || article.artikelnummer == 26){
              article.aktueller_lagerbestand += (+lager.amount/3);
            }else{
              article.aktueller_lagerbestand += +lager.amount;
            }
          }
        });
      });
    }
    

  } // Ende von ngOnInit

  //Produktionsaufträge berechnen anhand des Input in geplanter Endbestand sowie Übertrag auf Vertriebsuwnsch in nächste Zeile 
  changeP1(newValue: number, artikel: number){
    this.dataSourceP1.forEach(article => {
        if(artikel == article.artikelnummer){
          article.geplanter_endbestand = newValue;
            
          article.produktionsauftraege=
          +article.vertriebswunsch
          + +article.direktverkauf
          + +article.geplanter_endbestand
          - +article.aktueller_lagerbestand
          - +article.in_bearbeitung
          - +article.in_warteschlange;
        if(article.produktionsauftraege < 0){
          article.produktionsauftraege = 0;
        }
        
        // Produktionsauftrag auf Vertriebswunsch der Eigenentwicklungsteile übertragen
        if(artikel == 1){
          this.dataSourceP1[1].vertriebswunsch =this.dataSourceP1[0].produktionsauftraege;
          this.dataSourceP1[2].vertriebswunsch =this.dataSourceP1[0].produktionsauftraege;
        }else if(artikel == 51){
          this.dataSourceP1[3].vertriebswunsch =this.dataSourceP1[2].produktionsauftraege;
          this.dataSourceP1[4].vertriebswunsch =this.dataSourceP1[2].produktionsauftraege;
          this.dataSourceP1[5].vertriebswunsch =this.dataSourceP1[2].produktionsauftraege;
        }else if(artikel == 50){
          this.dataSourceP1[6].vertriebswunsch =this.dataSourceP1[5].produktionsauftraege;
          this.dataSourceP1[7].vertriebswunsch =this.dataSourceP1[5].produktionsauftraege;
          this.dataSourceP1[8].vertriebswunsch =this.dataSourceP1[5].produktionsauftraege;
        }else if(artikel == 49){
          this.dataSourceP1[9].vertriebswunsch =this.dataSourceP1[8].produktionsauftraege;
          this.dataSourceP1[10].vertriebswunsch =this.dataSourceP1[8].produktionsauftraege;
          this.dataSourceP1[11].vertriebswunsch =this.dataSourceP1[8].produktionsauftraege;
        }
      }
    });
    this.dataSourceP1 = [...this.dataSourceP1];
  }// Ende ChangeP1()

  //Produktionsaufträge berechnen anhand des Input in geplanter Endbestand sowie Übertrag auf Vertriebsuwnsch in nächste Zeile 
  changeP2(newValue: number, artikel: number){
    this.dataSourceP2.forEach(article => {
      if(artikel == article.artikelnummer){
        article.geplanter_endbestand = newValue;
              
        article.produktionsauftraege=
        +article.vertriebswunsch
        + +article.direktverkauf
        + +article.geplanter_endbestand
        - +article.aktueller_lagerbestand
        - +article.in_bearbeitung
        - +article.in_warteschlange;
        if(article.produktionsauftraege < 0){
          article.produktionsauftraege = 0;
        }
      
        // Produktionsauftrag auf Vertriebswunsch der Eigenentwicklungsteile übertragen
        if(artikel == 2){
          this.dataSourceP2[1].vertriebswunsch =this.dataSourceP2[0].produktionsauftraege;
          this.dataSourceP2[2].vertriebswunsch =this.dataSourceP2[0].produktionsauftraege;
        }else if(artikel == 56){
          this.dataSourceP2[3].vertriebswunsch =this.dataSourceP2[2].produktionsauftraege;
          this.dataSourceP2[4].vertriebswunsch =this.dataSourceP2[2].produktionsauftraege;
          this.dataSourceP2[5].vertriebswunsch =this.dataSourceP2[2].produktionsauftraege;
        }else if(artikel == 55){
          this.dataSourceP2[6].vertriebswunsch =this.dataSourceP2[5].produktionsauftraege;
          this.dataSourceP2[7].vertriebswunsch =this.dataSourceP2[5].produktionsauftraege;
          this.dataSourceP2[8].vertriebswunsch =this.dataSourceP2[5].produktionsauftraege;
        }else if(artikel == 54){
          this.dataSourceP2[9].vertriebswunsch =this.dataSourceP2[8].produktionsauftraege;
          this.dataSourceP2[10].vertriebswunsch =this.dataSourceP2[8].produktionsauftraege;
          this.dataSourceP2[11].vertriebswunsch =this.dataSourceP2[8].produktionsauftraege;
        }
      
      }
    });
    this.dataSourceP2 = [...this.dataSourceP2];
  }// Ende ChangeP2()

  //Produktionsaufträge berechnen anhand des Input in geplanter Endbestand sowie Übertrag auf Vertriebsuwnsch in nächste Zeile 
  changeP3(newValue: number, artikel: number){
    this.dataSourceP3.forEach(article => {
      if(artikel == article.artikelnummer){
        article.geplanter_endbestand = newValue;
              
        article.produktionsauftraege=
        +article.vertriebswunsch
        + +article.direktverkauf
        + +article.geplanter_endbestand
        - +article.aktueller_lagerbestand
        - +article.in_bearbeitung
        - +article.in_warteschlange;
        if(article.produktionsauftraege < 0){
          article.produktionsauftraege = 0;
        }
        // Produktionsauftrag auf Vertriebswunsch der Eigenentwicklungsteile übertragen
        if(artikel == 3){
          this.dataSourceP3[1].vertriebswunsch =this.dataSourceP3[0].produktionsauftraege;
          this.dataSourceP3[2].vertriebswunsch =this.dataSourceP3[0].produktionsauftraege;
        }else if(artikel == 31){
          this.dataSourceP3[3].vertriebswunsch =this.dataSourceP3[2].produktionsauftraege;
          this.dataSourceP3[4].vertriebswunsch =this.dataSourceP3[2].produktionsauftraege;
          this.dataSourceP3[5].vertriebswunsch =this.dataSourceP3[2].produktionsauftraege;
        }else if(artikel == 30){
          this.dataSourceP3[6].vertriebswunsch =this.dataSourceP3[5].produktionsauftraege;
          this.dataSourceP3[7].vertriebswunsch =this.dataSourceP3[5].produktionsauftraege;
          this.dataSourceP3[8].vertriebswunsch =this.dataSourceP3[5].produktionsauftraege;
        }else if(artikel == 29){
          this.dataSourceP3[9].vertriebswunsch =this.dataSourceP3[8].produktionsauftraege;
          this.dataSourceP3[10].vertriebswunsch =this.dataSourceP3[8].produktionsauftraege;
          this.dataSourceP3[11].vertriebswunsch =this.dataSourceP3[8].produktionsauftraege;
        }      
      }
    });
    this.dataSourceP3 = [...this.dataSourceP3];
  }// Ende ChangeP2()

  speichern() {
    const list_prouduktionsauftraege: Production[] = [];
    const prdunktionsauftraege_p1: Production = {attr_article: 1, attr_quantity: this.dataSourceP1[0].produktionsauftraege};
    
    //console.log("Produktionsaufträge P1");
    //console.log(prdunktionsauftraege_p1);
    
    const produktionsauftraege_p2: Production = {attr_article: 2, attr_quantity: this.dataSourceP2[0].produktionsauftraege};
    const produktionsauftraege_p3: Production = {attr_article: 3, attr_quantity: this.dataSourceP3[0].produktionsauftraege};
    const produktionsauftraege_p4: Production = {attr_article: 4, attr_quantity: this.dataSourceP1[6].produktionsauftraege};
    const produktionsauftraege_p5: Production = {attr_article: 5, attr_quantity: this.dataSourceP2[6].produktionsauftraege};
    const produktionsauftraege_p6: Production = {attr_article: 6, attr_quantity: this.dataSourceP3[6].produktionsauftraege};
    const produktionsauftraege_p7: Production = {attr_article: 7, attr_quantity: this.dataSourceP1[9].produktionsauftraege};
    const produktionsauftraege_p8: Production = {attr_article: 8, attr_quantity: this.dataSourceP2[9].produktionsauftraege};
    const produktionsauftraege_p9: Production = {attr_article: 9, attr_quantity: this.dataSourceP3[9].produktionsauftraege};
    const produktionsauftraege_p10: Production = {attr_article: 10, attr_quantity: this.dataSourceP1[7].produktionsauftraege};
    const produktionsauftraege_p11: Production = {attr_article: 11, attr_quantity: this.dataSourceP2[7].produktionsauftraege};
    const produktionsauftraege_p12: Production = {attr_article: 12, attr_quantity: this.dataSourceP3[7].produktionsauftraege};
    const produktionsauftraege_p13: Production = {attr_article: 13, attr_quantity: this.dataSourceP1[10].produktionsauftraege};
    const produktionsauftraege_p14: Production = {attr_article: 14, attr_quantity: this.dataSourceP2[10].produktionsauftraege};
    const produktionsauftraege_p15: Production = {attr_article: 15, attr_quantity: this.dataSourceP3[10].produktionsauftraege};
    const prdunktionsauftraege_p16: Production = {attr_article: 16, attr_quantity: this.dataSourceP1[3].produktionsauftraege + 
                                                  this.dataSourceP2[3].produktionsauftraege + this.dataSourceP3[3].produktionsauftraege};
    const produktionsauftraege_p17: Production = {attr_article: 17, attr_quantity: this.dataSourceP1[4].produktionsauftraege +
                                                  this.dataSourceP2[4].produktionsauftraege + this.dataSourceP3[4].produktionsauftraege};
    const produktionsauftraege_p18: Production = {attr_article: 18, attr_quantity: this.dataSourceP1[11].produktionsauftraege};
    const prdunktionsauftraege_p19: Production = {attr_article: 19, attr_quantity: this.dataSourceP2[11].produktionsauftraege};
    const produktionsauftraege_p20: Production = {attr_article: 20, attr_quantity: this.dataSourceP3[11].produktionsauftraege};
    const prdunktionsauftraege_p26: Production = {attr_article: 26, attr_quantity: this.dataSourceP1[1].produktionsauftraege + 
                                                 this.dataSourceP2[1].produktionsauftraege + this.dataSourceP3[1].produktionsauftraege};
    const produktionsauftraege_p29: Production = {attr_article: 29, attr_quantity: this.dataSourceP3[8].produktionsauftraege};
    const produktionsauftraege_p30: Production = {attr_article: 30, attr_quantity: this.dataSourceP3[5].produktionsauftraege};
    const produktionsauftraege_p31: Production = {attr_article: 31, attr_quantity: this.dataSourceP3[2].produktionsauftraege};
    const produktionsauftraege_p49: Production = {attr_article: 49, attr_quantity: this.dataSourceP1[8].produktionsauftraege};
    const produktionsauftraege_p50: Production = {attr_article: 50, attr_quantity: this.dataSourceP1[5].produktionsauftraege};
    const produktionsauftraege_p51: Production = {attr_article: 51, attr_quantity: this.dataSourceP1[2].produktionsauftraege};
    const produktionsauftraege_p54: Production = {attr_article: 54, attr_quantity: this.dataSourceP2[8].produktionsauftraege};
    const produktionsauftraege_p55: Production = {attr_article: 55, attr_quantity: this.dataSourceP2[5].produktionsauftraege};
    const produktionsauftraege_p56: Production = {attr_article: 56, attr_quantity: this.dataSourceP2[2].produktionsauftraege};

    list_prouduktionsauftraege.push(prdunktionsauftraege_p1);
    list_prouduktionsauftraege.push(produktionsauftraege_p2);
    list_prouduktionsauftraege.push(produktionsauftraege_p3);
    list_prouduktionsauftraege.push(produktionsauftraege_p4);
    list_prouduktionsauftraege.push(produktionsauftraege_p5);
    list_prouduktionsauftraege.push(produktionsauftraege_p6);
    list_prouduktionsauftraege.push(produktionsauftraege_p7);
    list_prouduktionsauftraege.push(produktionsauftraege_p8);
    list_prouduktionsauftraege.push(produktionsauftraege_p9);
    list_prouduktionsauftraege.push(produktionsauftraege_p10);
    list_prouduktionsauftraege.push(produktionsauftraege_p11);
    list_prouduktionsauftraege.push(produktionsauftraege_p12);
    list_prouduktionsauftraege.push(produktionsauftraege_p13);
    list_prouduktionsauftraege.push(produktionsauftraege_p14);
    list_prouduktionsauftraege.push(produktionsauftraege_p15);
    list_prouduktionsauftraege.push(prdunktionsauftraege_p16);
    list_prouduktionsauftraege.push(produktionsauftraege_p17);
    list_prouduktionsauftraege.push(produktionsauftraege_p18);
    list_prouduktionsauftraege.push(prdunktionsauftraege_p19);
    list_prouduktionsauftraege.push(produktionsauftraege_p20);
    list_prouduktionsauftraege.push(prdunktionsauftraege_p26);
    list_prouduktionsauftraege.push(produktionsauftraege_p29);
    list_prouduktionsauftraege.push(produktionsauftraege_p30);
    list_prouduktionsauftraege.push(produktionsauftraege_p31);
    list_prouduktionsauftraege.push(produktionsauftraege_p49);
    list_prouduktionsauftraege.push(produktionsauftraege_p50);
    list_prouduktionsauftraege.push(produktionsauftraege_p51);
    list_prouduktionsauftraege.push(produktionsauftraege_p54);
    list_prouduktionsauftraege.push(produktionsauftraege_p55);
    list_prouduktionsauftraege.push(produktionsauftraege_p56);
    
    let productionList: Productionlist = { production: list_prouduktionsauftraege }
    console.log('Produktionsaufträge');
    
    console.log(productionList);
    
    this.exportstore.dispatch(addProductionlist({productionlist: productionList}));

  }
}//Ende der Komponente
