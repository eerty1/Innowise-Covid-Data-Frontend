import {Component, OnInit} from '@angular/core';
import {CovidDataErrorService} from "../../service/covid-data-error.service";

@Component({
  selector: 'app-covid-data-error',
  templateUrl: './covid-data-error.component.html',
})
export class CovidDataErrorComponent implements OnInit {

  constructor(public covidDataErrorService: CovidDataErrorService) {
  }

  ngOnInit(): void {
  }
}
