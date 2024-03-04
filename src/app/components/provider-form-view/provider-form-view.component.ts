import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ProviderTableDataInterface } from '../../models/provider-table-data.interface';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { FormMode } from '../../models/form-mode';
import { ProviderService } from '../../services/provider.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-provider-form-view',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButton,
    MatCard,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    ReactiveFormsModule,
    DatePipe,
  ],
  templateUrl: './provider-form-view.component.html',
  styleUrl: './provider-form-view.component.css',
})
export class ProviderFormViewComponent implements OnInit {
  @Input() provider!: ProviderTableDataInterface;
  public providerTypes!: Map<number, string>;
  public isReady = false;
  protected readonly FormMode = FormMode;

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {
    this.providerService
      .getProviderTypes()
      .pipe(map((data: Map<number, string>) => (this.providerTypes = data)))
      .subscribe(() => {
        this.isReady = true;
      });
  }
}
