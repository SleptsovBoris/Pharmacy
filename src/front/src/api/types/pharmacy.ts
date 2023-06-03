export interface IPharmacy {
  aptekaId: number;
  address: string;
  district: string;
  metro: string;
  workTime: string;
}

export interface IFavorPharmacy {
  favorPharmacyId: number;
  aptekaId: number;
  userId: number;
}
