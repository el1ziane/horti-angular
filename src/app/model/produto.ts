export interface Produto {
  _id: string;
  codigo: string;
  produtoNome: string;
  quantidadeProduto: number | null;
  valorProduto: number | null;
  peso: number | null;
  showDetails?: boolean;
}
