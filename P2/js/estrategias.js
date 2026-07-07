export const AtaqueFisico = {
    nome: "Ataque Físico",
    executar(origem, alvo) {
        const dano = origem.servicoCombate.calcularDanoBase(origem.getAtk(), 0);
        alvo.hp = Math.max(0, alvo.hp - dano);
        return `${origem.getNome()} desferiu Ataque Físico causando ${dano} de dano em ${alvo.nome}!`;
    }
};

export const AtaqueFurtivo = {
    nome: "Ataque Furtivo",
    executar(origem, alvo) {
        const critico = Math.random() > 0.4 ? 10 : 0;
        const dano = origem.servicoCombate.calcularDanoBase(origem.getAtk(), critico);
        alvo.hp = Math.max(0, alvo.hp - dano);
        return `${origem.getNome()} usou Ataque Furtivo ${critico ? '[CRÍTICO!]' : ''} causando ${dano} de dano em ${alvo.nome}!`;
    }
};

export const CuraMagica = {
    nome: "Cura Mágica",
    executar(origem, alvo) {
        const cura = 15;
        const hpAntigo = origem.hp;
        origem.hp = Math.min(origem.getHpMax(), origem.hp + cura);
        return `${origem.getNome()} conjurou Cura Mágica e recuperou ${origem.hp - hpAntigo} de vida!`;
    }
};
