import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';
import { ProviderTableDataInterface } from '../../models/provider-table-data.interface';
import { DatePipe, NgStyle } from '@angular/common';
import {
  Form,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProviderService } from '../../services/provider.service';
import { concatMap, map } from 'rxjs/operators';
import {
  CancelForm,
  ProviderFormComponent,
} from '../provider-form/provider-form.component';
import { zip } from 'rxjs';
import { FormMode } from '../../models/form-mode';

export type ProviderTableHeaderType = {
  displayName: string;
  tooltipMessage: string;
};
export type FormMetaInfo = {
  formGroup: FormGroup;
  isCreateNewForm: boolean;
};
@Component({
  selector: 'app-provider-table',
  standalone: true,
  imports: [
    MaterialModule,
    DatePipe,
    NgStyle,
    FormsModule,
    ReactiveFormsModule,
    ProviderFormComponent,
  ],
  templateUrl: './provider-table.component.html',
  styleUrl: './provider-table.component.css',
})
export class ProviderTableComponent implements OnInit {
  public tableData!: ProviderTableDataInterface[];
  public headerData: ProviderTableHeaderType[] = [
    { displayName: '', tooltipMessage: '' },
    {
      displayName: 'Provider Name',
      tooltipMessage: 'Tooltip for Provider Name',
    },
    {
      displayName: 'Provider Type',
      tooltipMessage: 'Tooltip for Provider Type',
    },
    {
      displayName: 'Expected Cost',
      tooltipMessage: 'Tooltip for Expected Cost',
    },
    { displayName: 'Actual Cost', tooltipMessage: 'Tooltip for Actual Cost' },
    {
      displayName: 'Expected Start time',
      tooltipMessage: 'Tooltip for Expected Start time',
    },
    {
      displayName: 'Actual Start time',
      tooltipMessage: 'Tooltip for Actual Start time',
    },
    {
      displayName: 'Expected End time',
      tooltipMessage: 'Tooltip for Expected End time',
    },
    {
      displayName: 'Actual End time',
      tooltipMessage: 'Tooltip for Actual End time',
    },
  ];
  public formMode: FormMode = FormMode.VIEW;
  public isOpenFormByIds: { providerId: number; isOpened: boolean }[] = [];
  public forms: Map<number, FormMetaInfo> = new Map();
  public isReady: boolean = false;
  public providerTypes: Map<number, string> = new Map();
  constructor(private providerService: ProviderService) {}
  ngOnInit(): void {
    zip(
      this.providerService.getProvidersData(),
      this.providerService.getProviderTypes(),
    )
      .pipe(
        map(
          ([providers, providerTypes]: [
            ProviderTableDataInterface[],
            Map<number, string>,
          ]) => {
            this.tableData = providers;
            this.providerTypes = providerTypes;
            return providers;
          },
        ),
      )
      .subscribe(() => {
        this.isReady = true;
      });

    this.tableData.forEach((data) => {
      this.isOpenFormByIds.push({
        providerId: data.id,
        isOpened: false,
      });
    });
  }

  public openFormById(provider: ProviderTableDataInterface): void {
    const foundItem = this.isOpenFormByIds.find(
      (data) => data.providerId === provider.id,
    );
    if (foundItem) {
      if (!foundItem.isOpened) {
        this.initFormGroupById(provider, false);
      }
      foundItem.isOpened = !foundItem.isOpened;
    }
  }

  public isFormOpen(id: number): boolean {
    const foundItem = this.isOpenFormByIds.find(
      (data) => data.providerId === id,
    );
    if (foundItem) {
      return foundItem.isOpened;
    } else return false;
  }

  private initFormGroupById(
    provider: ProviderTableDataInterface | undefined,
    isCreateNewForm: boolean,
  ) {
    if (!provider) {
      return;
    }
    if (!this.forms.has(provider.id)) {
      this.forms.set(provider.id, {
        formGroup: new FormGroup<any>({
          id: new FormControl<number>(provider.id),
          providerName: new FormControl<string>(provider.providerName, [
            Validators.required,
          ]),
          providerTypeid: new FormControl<number>(provider.providerTypeid, [
            Validators.required,
          ]),
          expectedCost: new FormControl<number>(provider.expectedCost, [
            Validators.required,
          ]),
          actualCost: new FormControl<number>(provider.actualCost, [
            Validators.required,
          ]),
          expectedStartTime: new FormControl<Date>(provider.expectedStartTime, [
            Validators.required,
          ]),
          expectedEndTime: new FormControl<Date>(provider.expectedEndTime, [
            Validators.required,
          ]),
          actualStartTime: new FormControl<Date>(provider.actualStartTime, [
            Validators.required,
          ]),
          actualEndTime: new FormControl<Date>(provider.actualEndTime, [
            Validators.required,
          ]),
          expectedResult: new FormControl<string>(provider.expectedResult, [
            Validators.required,
          ]),
          providedProduct: new FormControl<string>(provider.providedProduct, [
            Validators.required,
          ]),
          notes: new FormControl<string>(provider.notes),
        }),
        isCreateNewForm: isCreateNewForm,
      });
    }
  }

  getFormMetaInfoById(id: number): FormMetaInfo {
    if (!this.forms.has(id)) {
      this.initFormGroupById(
        this.tableData.find((data) => data.id === id),
        false,
      );
    }
    return this.forms.get(id)!;
  }

  protected readonly FormMode = FormMode;

  public createNewProvider() {
    let nextId = this.providerService.getNextId();
    let newProvider: ProviderTableDataInterface = {
      id: nextId,
      providerName: '',
      providerTypeid: 0,
      expectedCost: 0,
      actualCost: 0,
      expectedStartTime: new Date(),
      expectedEndTime: new Date(),
      actualStartTime: new Date(),
      actualEndTime: new Date(),
      expectedResult: '',
      providedProduct: '',
      notes: '',
    };
    this.initFormGroupById(newProvider, true);
    this.tableData.push(newProvider);
    this.isOpenFormByIds.push({
      providerId: newProvider.id,
      isOpened: true,
    });

    this.formMode = FormMode.EDIT;
    console.log(this.forms.get(newProvider.id));
  }

  checkSaveSuccess($event: boolean) {}

  public cancel($event: CancelForm) {
    if ($event.isNewForm) {
      this.tableData = this.tableData.filter(
        (data) => data.id !== $event.providerId,
      );
    }
  }

  public save($event: ProviderTableDataInterface) {
    this.providerService
      .getProvidersData()
      .pipe(
        map((data) => {
          this.tableData = data;
        }),
      )
      .subscribe();
    this.getFormMetaInfoById($event.id).isCreateNewForm = false;
  }
}
