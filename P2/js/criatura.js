import { AtaqueFisico } from './estrategias.js';

export class Criatura {
    constructor(id, nome, hp, atk, servicoCombate) {
        this.id = id;
        this.nome = nome;
        this.hpMax = hp;
        this.hp = hp;
        this.atk = atk;
        this.servicoCombate = servicoCombate; 
        this.estrategiaDeAcao = AtaqueFisico; 
    }

    getId() { return this.id; }
    getNome() { return this.nome; }
    getAtk() { return this.atk; }
    getHpMax() { return this.hpMax; }
    
    setEstrategia(estrategia) { this.estrategiaDeAcao = estrategia; }

    executarAcao(alvo) {
        return this.estrategiaDeAcao.executar(this, alvo);
    }

    clone() {
        const novoClone = new Criatura(Date.now() + Math.random(), this.nome, this.hpMax, this.atk, this.servicoCombate);
        novoClone.hp = this.hp;
        novoClone.estrategiaDeAcao = this.estrategiaDeAcao;
        return novoClone;
    }
}
