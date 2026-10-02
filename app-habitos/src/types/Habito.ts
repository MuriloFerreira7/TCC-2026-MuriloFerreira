export interface Habito {
    id?: string;
    nome: string;
    descricao?: string
    tipo: "simples" | "contador";
    frequencia: "diario" | "semanal" | "quinzenal" | "mensal";
    meta?: number;
    unidade?: string;
    ativo: boolean;
}