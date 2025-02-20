import { Espaco } from "./espaco.interface";
export interface Reserva {
    id: string;
    espaco: Espaco;
    solicitante: string;
    dataInicio: Date;
    dataFim: Date;
    status: 'Aprovada' | 'Pendente' | 'Cancelada' | 'Concluída';
    finalidade: string;
    participantes: number;
  }