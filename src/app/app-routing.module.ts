import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ContentComponent } from './content/content.component'
import { SupportComponent } from './content/support/support.component';
import { SimulationComponent } from './content/simulation/simulation.component';
import { ErgebnisseComponent } from './content/ergebnisse/ergebnisse.component';
import { AbsatzplanungComponent } from './content/absatzplanung/absatzplanung.component';
import { ProgrammplanungComponent } from './content/programmplanung/programmplanung.component';
import { KapazitaetsplanungComponent } from './content/kapazitaetsplanung/kapazitaetsplanung.component';
import { MengenplanungComponent } from './content/mengenplanung/mengenplanung.component';
import { LosgroessensplittingComponent } from './content/losgroessensplitting/losgroessensplitting.component';

const routes: Routes = [
  { path: '', component: ContentComponent },
  { path: 'simulation', component: SimulationComponent },
  { path: 'ergebnisse', component: ErgebnisseComponent },
  { path: 'support', component: SupportComponent },
  { path: 'absatzplanung', component: AbsatzplanungComponent },
  { path: 'programmplanung', component: ProgrammplanungComponent },
  { path: 'kapazitaetsplanung', component: KapazitaetsplanungComponent },
  { path: 'mengenplanung', component: MengenplanungComponent },
  { path: 'losgroessensplitting', component: LosgroessensplittingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
