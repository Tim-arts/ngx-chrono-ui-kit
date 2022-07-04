/* eslint-disable prettier/prettier */
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ManoeuvreService } from '../manoeuvre.service';
import { ITurn } from '../models/manoeuvre';

@Component({
  selector: 'ui-kit-manoeuvre-list',
  templateUrl: './manoeuvre-list.component.html',
  styleUrls: ['./manoeuvre-list.component.scss']
})
export class ManoeuvreListComponent implements OnInit {
  @Input() manoeuvres: ITurn[];

  constructor(public manoeuvreService: ManoeuvreService) { }

  ngOnInit(): void {
  }

}
