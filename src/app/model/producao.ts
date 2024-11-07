import { Produto } from "./produto";

export interface Producao {
  _id: string;
  codigoProducao: string;
  produtoProducao: Produto | null;
  quantidadeProducao: number | null;
  dataProducao: Date;
  showDetails?: boolean;

}
