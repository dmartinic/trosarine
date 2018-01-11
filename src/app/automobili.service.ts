import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AutomobiliService {

  constructor(private http: HttpClient) {
  }

  public getDataPostotci2017(): Observable<any> {
    return this.http.get("./assets/json_data/postotakodcijene.json")
  }

  public getDataPostotci(): Observable<any> {
    return this.http.get("./assets/json_data/postotakodcijene2018.json")
  }

  public getDataNaknade(): Observable<any> {
    return this.http.get("./assets/json_data/naknadeco2.json")
  }

  public getDataPadVrijednosti(): Observable<any> {
    return this.http.get("./assets/json_data/padvrijednosti.json")
  }

  public getDataCCMKoeficijenti(): Observable<any> {
    return this.http.get("./assets/json_data/ccmkoeficijenti.json")
  }
}
