export interface Despesa {
  _id: string;
  fornecedorDespesa: string;
  descricaoDespesa: string;
  valorDespesa: number | null;
  dataDespesa: Date;
  statusDespesa: string;
  showDetails?: boolean;
}
