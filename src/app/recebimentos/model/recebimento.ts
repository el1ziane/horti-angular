export interface Recebimento {
  _id: string;
  fornecedor: string;
  produto: string;
  quantidadeRecebimento: number;
  valorRecebimento: number;
  dataRecebimento: Date;
  status: string; // Usando o tipo enumeração para o status
}
