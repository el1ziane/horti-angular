import { Produto } from "./produto";

export interface Estimativa {
    _id: string | null;
    produtoEstimativa: Produto | null;
    caixaEstimativa: number | null;
    pesoEstimativa: number | null;
    tipoEntrada: string;
    showDetails?: boolean;
   // producaoEstimada: number | null;
}
