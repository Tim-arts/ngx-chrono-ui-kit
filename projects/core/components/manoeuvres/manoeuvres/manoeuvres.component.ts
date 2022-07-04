/* eslint-disable prettier/prettier */
import { ChangeDetectionStrategy, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ManoeuvreService } from '../manoeuvre.service';
import { ITurn } from '../models/manoeuvre';
import { ManoeuvreHeader } from '../models/manoeuvre-header';

@Component({
  selector: 'ui-kit-manoeuvres',
  templateUrl: './manoeuvres.component.html',
  styleUrls: ['./manoeuvres.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ManoeuvresComponent implements OnInit, OnDestroy { 
  @Input() manoeuvres: ITurn[];
  @Input() title: ManoeuvreHeader = {
    text: 'Manoeuvres et arrêts',
  };

  sub: Subscription;
  constructor(private manoeuvreService: ManoeuvreService) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
