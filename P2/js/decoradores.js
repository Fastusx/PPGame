class CriaturaDecorator {
    constructor(criatura) {
        this.criatura = criatura;
    }
    getId() { return this.criatura.getId(); }
    getNome() { return this.criatura.getNome(); }
    getAtk() { return this.criatura.getAtk(); }
    getHpMax() { return this.criatura.getHpMax(); }
    get hp() { return this.criatura.hp; }
    set hp(val) { this.criatura.hp = val; }
    get servicoCombate() { return this.criatura.servicoCombate; }
    get estrategiaDeAcao() { return this.criatura.estrategiaDeAcao; }
    setEstrategia(est) { this.criatura.setEstrategia(est); }
    executarAcao(alvo) { return this.criatura.executarAcao(alvo); }
    clone() { return new CriaturaDecorator(this.criatura.clone()); }
}

export class RunaDeFogoDecorator extends CriaturaDecorator {
    getNome() { return this.criatura.getNome();}
    getAtk() { return this.criatura.getAtk() + 5; } 
}

export class EscudoEspinhosDecorator extends CriaturaDecorator {
    getNome() { return this.criatura.getNome(); }
    getHpMax() { return this.criatura.getHpMax() + 10; } 
}
