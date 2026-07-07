export class AcaoCommand {
    constructor(executante, alvo) {
        this.executante = executante;
        this.alvo = alvo;
        this.snapshotExecutanteHp = executante.hp;
        this.snapshotAlvoHp = alvo ? alvo.hp : null;
        this.logResult = "";
    }

    executar() {
        this.logResult = this.executante.executarAcao(this.alvo);
        return this.logResult;
    }

    desfazer() {
        this.executante.hp = this.snapshotExecutanteHp;
        if (this.alvo) this.alvo.hp = this.snapshotAlvoHp;
        return `[Desfeito] Revertido estado de ${this.executante.getNome()}`;
    }
}

export class MacroComando {
    constructor(comandos) {
        this.comandos = comandos;
    }

    executar() {
        return this.comandos.map(cmd => cmd.executar()).join("<br>");
    }

    desfazer() {
        return this.comandos.reverse().map(cmd => cmd.desfazer()).join("<br> (Macro Undone)");
    }
}
