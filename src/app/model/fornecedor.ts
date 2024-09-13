export interface Fornecedor {
  _id: string;
  fornecedorNome: string;
  cnpj: string;
  telefone: string;
  email: string;
  showDetails?: boolean;
}
