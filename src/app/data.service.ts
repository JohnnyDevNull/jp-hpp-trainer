import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IData } from './data.interface';

@Injectable({ providedIn: 'root' })
export class DataService {
  public constructor(private readonly http: HttpClient) {}

  public fetchData() {
    return this.http.get<IData>('/assets/data.json');
  }
}
