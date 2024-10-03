export interface Estoque {
  _id: string;
  codigoEstoque: string;
  produtoEstoque: string;
  quantidadeEstoque: number | null;
  valorUnitarioEstoque: number | null;
  valorTotalEstoque: number | null;
  dataEstoque: Date;
  showDetails?: boolean;
}
