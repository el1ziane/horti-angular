import { Produto } from "./produto";

export interface Estoque {
  _id: string;
  codigoEstoque: string;
  produtoEstoque: Produto | null;
  quantidadeEstoque: number | null;
  valorUnitarioEstoque: number | null;
  valorTotalEstoque: number | null;
  dataEstoque: Date;
  showDetails?: boolean;
}
