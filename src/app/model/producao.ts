import { Produto } from "./produto";

export interface Producao {
  _id: string;
  codigoProducao: string;
  produtoProducao: Produto;
  quantidadeProducao: number | null;
  dataProducao: Date;
  showDetails?: boolean;

}
