export interface IDrug {
  drugId: number;
  drugName: string;
  img: string;
  description: string;
  kindId: number;
  formId: number;
  manufacturerId: number;
  amount: string;
  instruction: string;
  price: number;
  recept: string;
}

export interface IFavorDrug {
  favorDrugId: number;
  userId: number;
  drugId: number;
}
