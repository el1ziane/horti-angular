import { Produto } from "./produto";

export interface Compra {
  _id: string;
  fornecedorCompra: string;
  produtoCompra: Produto;
  quantidadeCompra: number | null;
  valorCompra: number | null;
  dataCompra: Date;
  status: string;
  showDetails?: boolean;
}
