export interface RecursoDisponivel {
    id: number;
    nome: string;
    descricao: string;
  }
  
  export interface Espaco {
    id: number;
    nome: string;
    tipo: string;
    capacidade: number;
    localizacao: string;
    status: string;
    descricao: string;
    recursosDisponiveis: RecursoDisponivel[];
    dataCadastro: string;
    dataProcedimento: string;
    notasAdicionais: string;
  }