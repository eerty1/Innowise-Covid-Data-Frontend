import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AvailableCountries} from "../model/available-countries.model";
import {Observable, throwError} from "rxjs";
import {RequiredCountries} from "../model/required-countries.model";
import {catchError} from "rxjs/operators";
import {CovidDataErrorService} from "./covid-data-error.service";
import {MinMaxStatisticsResponse} from "../model/min-max-statistics-response.model";

@Injectable({
  providedIn: 'root'
})

export class CovidDataService {
  private covidDataUrl = 'http://localhost:8080/covid-data'

  constructor(private httpClient: HttpClient, private covidDataErrorService: CovidDataErrorService) {
  }

  getAvailableCountries(): Observable<AvailableCountries[]> {
    return this.httpClient.get<AvailableCountries[]>(this.covidDataUrl)
      .pipe(catchError(this.errorHandler.bind(this)))
  }

  postRequiredCountries(requiredCountries: RequiredCountries): Observable<MinMaxStatisticsResponse> {
    return this.httpClient.post<MinMaxStatisticsResponse>(this.covidDataUrl, requiredCountries)
      .pipe(catchError(this.errorHandler.bind(this)))
  }

  private errorHandler(error: HttpErrorResponse) {
    this.covidDataErrorService.handleError(error.error)
    return throwError(() => error.error)
  }
}
