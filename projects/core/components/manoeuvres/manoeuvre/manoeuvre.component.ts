/* eslint-disable prettier/prettier */
import { ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ManoeuvreService } from '../manoeuvre.service';
import { ITurn } from '../models/manoeuvre';

@Component({
  selector: 'ui-kit-manoeuvre',
  templateUrl: './manoeuvre.component.html',
  styleUrls: ['./manoeuvre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ManoeuvreComponent implements OnInit {
  @Input() manItem: ITurn;
  constructor(private manoeuvreService: ManoeuvreService,
              private matIconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'droite',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/droite.svg')
    );

    
    this.matIconRegistry.addSvgIcon(
      'gauche',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/gauche.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'ellipsis-v',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../../../ellipsis-vertical.svg')
    );
  }

  centerOnPicto(): void {
    this.manoeuvreService?.changeCenterOnPicto(this.manItem);
  }

  definirManoeuvre(): void {
    this.manoeuvreService?.changeDefinirManoeuvre(this.manItem);
  }

  supprimerManoeuvre(): void {
    this.manoeuvreService?.changeSupprimerManoeuvre(this.manItem);
  }


  ngOnInit(): void {
  }

}
