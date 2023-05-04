import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {AvailableCountries} from "../../model/available-countries.model";
import {CovidDataService} from "../../service/covid-data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RequiredCountries} from "../../model/required-countries.model";
import {MinMaxStatisticsResponse} from "../../model/min-max-statistics-response.model";

@Component({
  selector: 'app-select-required-countries', templateUrl: './select-required-countries.component.html'
})

export class SelectRequiredCountriesComponent implements OnInit {
  submitted = false
  minMaxStatisticsResponse: MinMaxStatisticsResponse
  availableCountries$: Observable<AvailableCountries[]>

  requiredCountriesForm = new FormGroup({
    AvailableCountries: new FormControl(null, Validators.required),
    DateFrom: new FormControl('', Validators.required),
    DateTo: new FormControl('', Validators.required)
  })

  constructor(private availableCountriesService: CovidDataService) {
  }

  get availableCountries() {
    return this.requiredCountriesForm.controls['AvailableCountries']
  }

  get dateFrom() {
    return this.requiredCountriesForm.controls['DateFrom']
  }

  get dateTo() {
    return this.requiredCountriesForm.controls['DateTo']
  }

  ngOnInit(): void {
    this.availableCountries$ = this.availableCountriesService.getAvailableCountries()
  }

  submitRequiredCountries() {
    this.submitted = true
    const requiredCountries: RequiredCountries = {
      availableCountries: this.availableCountries.value, dateFrom: this.dateFrom.value, dateTo: this.dateTo.value,
    };

    if (requiredCountries.availableCountries !== null && requiredCountries.dateFrom !== '' && requiredCountries.dateTo !== '') {
      this.availableCountriesService.postRequiredCountries(requiredCountries).subscribe({
        next: minMaxStatistics => {
          this.minMaxStatisticsResponse = minMaxStatistics
        }
      })
    }
  }
}
