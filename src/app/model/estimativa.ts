export interface Estimativa {
    _id: string | null;
    produtoEstimativa: string;
    caixaEstimativa: number | null;
    pesoEstimativa: number | null;
    tipoEntrada: string;
    showDetails?: boolean;
   // producaoEstimada: number | null;
}
