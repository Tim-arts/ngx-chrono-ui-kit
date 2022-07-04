/* eslint-disable prettier/prettier */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITurn } from './models/manoeuvre';
import { ManoeuvreHeader } from './models/manoeuvre-header';

@Injectable({
  providedIn: 'root'
})
export class ManoeuvreService {
  private manoeuvresSource = new BehaviorSubject<ITurn[]>([]);
  manoeuvresChanges$ = this.manoeuvresSource.asObservable();

  private manoeuvreHeaderSource = new BehaviorSubject<ManoeuvreHeader | null>(null);
  manoeuvreHeaderChanges$ = this.manoeuvreHeaderSource.asObservable();

  private centerOnPictoSource = new BehaviorSubject<ITurn | null>(null);
  centerOnPictoChanges$ = this.centerOnPictoSource.asObservable();

  private definirManoeuvreSource = new BehaviorSubject<ITurn | null>(null);
  definirManoeuvreChanges$ = this.definirManoeuvreSource.asObservable();

  private supprimerManoeuvreSource = new BehaviorSubject<ITurn | null>(null);
  supprimerManoeuvreChanges$ = this.supprimerManoeuvreSource.asObservable();

  constructor() { }

  changeManoeuvres(manoeuvres: ITurn[]): void {
    this.manoeuvresSource.next(manoeuvres);
  }

  changeManoeuvreHeader(manoeuvreHeader: ManoeuvreHeader): void {
    this.manoeuvreHeaderSource.next(manoeuvreHeader);
  }

  changeCenterOnPicto(manoeuvre: ITurn): void {
    this.centerOnPictoSource.next(manoeuvre);
  }

  changeDefinirManoeuvre(manoeuvre: ITurn): void {
    this.definirManoeuvreSource.next(manoeuvre);
  }

  changeSupprimerManoeuvre(manoeuvre: ITurn): void {
    this.supprimerManoeuvreSource.next(manoeuvre);
  }

}
