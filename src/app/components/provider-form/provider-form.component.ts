import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProviderService } from '../../services/provider.service';
import { AsyncPipe } from '@angular/common';
import { ProviderTableDataInterface } from '../../models/provider-table-data.interface';
import { MaterialModule } from '../../modules/material/material.module';
import { ProviderFormViewComponent } from '../provider-form-view/provider-form-view.component';
import { FormMode } from '../../models/form-mode';
import { FormMetaInfo } from '../provider-table/provider-table.component';

@Component({
  selector: 'app-provider-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    MaterialModule,
    ProviderFormViewComponent,
  ],
  templateUrl: './provider-form.component.html',
  styleUrl: './provider-form.component.css',
})
export class ProviderFormComponent implements OnInit {
  @Input() formMetaInto!: FormMetaInfo;
  @Input() provider!: ProviderTableDataInterface;
  @Input() formMode: FormMode = FormMode.VIEW;
  @Output() cancel: EventEmitter<CancelForm> = new EventEmitter<CancelForm>();
  @Output() save: EventEmitter<ProviderTableDataInterface> = new EventEmitter();
  providerTypeData$!: Observable<Map<number, string>>;
  constructor(private providerService: ProviderService) {}
  ngOnInit() {
    this.providerTypeData$ = this.providerService.getProviderTypes();
  }

  onSave() {
    if (this.formMetaInto.formGroup.valid) {
      this.providerService.updateProviderById(
        this.formMetaInto.formGroup.value,
      );
      this.formMode = FormMode.VIEW;
      this.save.emit(this.provider);
    }
  }

  onCancel() {
    this.formMode = FormMode.VIEW;
    this.cancel.emit({
      isNewForm: this.formMetaInto.isCreateNewForm,
      providerId: this.provider.id,
    });
  }

  protected readonly FormMode = FormMode;
}

export type CancelForm = {
  isNewForm: boolean;
  providerId: number;
};
