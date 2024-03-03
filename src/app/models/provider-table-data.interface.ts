export interface ProviderTableDataInterface {
  id: number;
  providerName: string;
  providerTypeid: number;
  expectedCost: number;
  actualCost: number;
  expectedStartTime: Date;
  expectedEndTime: Date;
  actualStartTime: Date;
  actualEndTime: Date;
  providedProduct: string;
  expectedResult: string;
  notes: string;
}
