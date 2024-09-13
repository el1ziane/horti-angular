export interface Venda {
  _id: string;
  codigoVenda: string;
  produtoVenda: string;
  quantidadeVenda: number | null;
  valorVenda: number | null;
  dataInicial: Date;
  dataFinal: Date;
  statusVenda: string;
  showDetails?: boolean;
}
