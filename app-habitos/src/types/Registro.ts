export interface Registro {
    id?: string;
    habitoId: string;
    data: Date;
    concluido: boolean;
    valor?: number;
}