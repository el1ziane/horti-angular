import { Produto } from "./produto";

export interface Venda {
  _id: string;
  codigoVenda: string;
  produtoVenda:  Produto | null;
  quantidadeVenda: number | null;
  valorVenda: number | null;
  dataInicial: Date;
  dataFinal: Date;
  statusVenda: string;
  showDetails?: boolean;
}
