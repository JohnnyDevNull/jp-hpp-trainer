import { AfterViewInit, Component } from '@angular/core';
import { DataFacadeService } from './data-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  public constructor(public readonly dataFacade: DataFacadeService) {}

  ngAfterViewInit() {
    this.dataFacade.load();
  }
}
