export interface Faturamento {
  _id: string;
  dataFat: string;
  produtoFat: string;
  vendaFat: string;
  valorFat: number | null;
  prodFat: number | null;
  vcompraFat: number | null;
  lucroFat: number | null;
  perdaFat: number | null;
}
