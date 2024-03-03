import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';
import { ProviderTableComponent } from '../provider-table/provider-table.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MaterialModule, ProviderTableComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
