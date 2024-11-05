import { Produto } from "./produto";

export interface Compra {
  _id: string;
  fornecedorRec: string;
  produto: Produto;
  quantidadeRecebimento: number | null;
  valorRecebimento: number | null;
  dataRecebimento: Date;
  status: string;
  showDetails?: boolean;
}
