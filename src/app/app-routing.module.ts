import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlipCardsComponent } from './pages/flip-cards/flip-cards.component';
import { MultipleChoiceComponent } from './pages/multiple-choice/multiple-choice.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'flip-cards' },
  { path: 'flip-cards', component: FlipCardsComponent },
  { path: 'multiple-choice', component: MultipleChoiceComponent },
  { path: '**', redirectTo: 'flip-cards' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
