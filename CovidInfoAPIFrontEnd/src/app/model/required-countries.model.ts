import {AvailableCountries} from "./available-countries.model";

export interface RequiredCountries {
  availableCountries: AvailableCountries[]
  dateFrom: string
  dateTo: string
}
