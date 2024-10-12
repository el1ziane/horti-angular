export interface Compra {
  _id: string;
  fornecedorRec: string;
  produto: string;
  quantidadeRecebimento: number | null;
  valorRecebimento: number | null;
  dataRecebimento: Date;
  status: string;
  showDetails?: boolean;
}
