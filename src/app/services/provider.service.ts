import { Injectable } from '@angular/core';
import { ProviderTableDataInterface } from '../models/provider-table-data.interface';
import { Observable, of } from 'rxjs';

export type ResultFormBack = {
  hasError: boolean;
  errorMessage: string;
};
@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private maxid = 3;
  constructor() {}
  private providers: ProviderTableDataInterface[] = [
    {
      id: 1,
      providerName: 'Provider1',
      providerTypeid: 1,
      expectedCost: 1000,
      actualCost: 500,
      expectedStartTime: new Date(),
      expectedEndTime: new Date(),
      actualStartTime: new Date(),
      actualEndTime: new Date(),
      expectedResult: 'expectedResultexpectedResultexpectedResult',
      providedProduct: 'providedProductprovidedProduct',
      notes:
        'notesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnote' +
        'snotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotes',
    },
    {
      id: 2,
      providerName: 'Provider2',
      providerTypeid: 2,
      expectedCost: 2000,
      actualCost: 500,
      expectedStartTime: new Date(),
      expectedEndTime: new Date(),
      actualStartTime: new Date(),
      actualEndTime: new Date(),
      expectedResult: 'expectedResultexpectedResultexpectedResult',
      providedProduct: 'providedProductprovidedProduct',
      notes:
        'notesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnote' +
        'snotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotes',
    },
    {
      id: 3,
      providerName: 'Provider3',
      providerTypeid: 3,
      expectedCost: 3000,
      actualCost: 500,
      expectedStartTime: new Date(),
      expectedEndTime: new Date(),
      actualStartTime: new Date(),
      actualEndTime: new Date(),
      expectedResult: 'expectedResultexpectedResultexpectedResult',
      providedProduct: 'providedProductprovidedProduct',
      notes:
        'notesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnote' +
        'snotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotesnotes',
    },
  ];

  private providersTypes: Map<number, string> = new Map<number, string>()
    .set(1, 'Provider Type1')
    .set(2, 'Provider Type2')
    .set(3, 'Provider Type3');
  public getProvidersData(): Observable<ProviderTableDataInterface[]> {
    return of(this.providers);
    // return of([]);
  }

  public getProviderTypes(): Observable<Map<number, string>> {
    return of(this.providersTypes);
  }

  public updateProviderById(provider: ProviderTableDataInterface) {
    this.providers.forEach((data, index) => {
      if (data.id === provider.id) {
        this.providers[index] = provider;
      }
    });
  }

  public createNewProvider(
    newProvider: ProviderTableDataInterface,
  ): Observable<ProviderTableDataInterface> {
    ++this.maxid;
    this.providers.push(newProvider);
    return of(newProvider);
  }

  public getNextId(): number {
    return ++this.maxid;
  }
}
