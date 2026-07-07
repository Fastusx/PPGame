import { ServicoDeLogicaDeCombate } from './combatService.js';
import { Criatura } from './criatura.js';
import { RunaDeFogoDecorator, EscudoEspinhosDecorator } from './decoradores.js';
import { AtaqueFisico, AtaqueFurtivo, CuraMagica } from './estrategias.js';
import { AcaoCommand, MacroComando } from './comandos.js';

export class MotorDeJogoFacade {
    constructor() {
        this.servicoCombate = new ServicoDeLogicaDeCombate();
        this.monstroBase = new Criatura("base", "Goblin Recruta", 50, 10, this.servicoCombate);
        this.horda = [];
        this.pilhaComandos = [];
        this.alvoTreino = { nome: "Boneco de Treino", hp: 500 };
        this.idSelecionado = null;
    }

    clonarMonstro() {
        const novoClone = this.monstroBase.clone();
        this.horda.push(novoClone);
        this.log(`Horda: Novo clone '${novoClone.getNome()}' gerado.`);
        this.render();
    }

    selecionarMonstro(id) {
        this.idSelecionado = id;
        this.render();
    }

    equiparItem(tipo) {
        const idx = this.horda.findIndex(m => m.getId() === this.idSelecionado);
        if (idx !== -1) {
            if (tipo === 'runa') this.horda[idx] = new RunaDeFogoDecorator(this.horda[idx]);
            if (tipo === 'escudo') {
                this.horda[idx] = new EscudoEspinhosDecorator(this.horda[idx]);
                this.horda[idx].hp += 10;
            }
            this.log(`Customização: Modificadores aplicados.`);
            this.render();
        }
    }

    mudarEstrategia(tipo) {
        const monstro = this.horda.find(m => m.getId() === this.idSelecionado);
        if (monstro) {
            if (tipo === 'fisico') monstro.setEstrategia(AtaqueFisico);
            if (tipo === 'furtivo') monstro.setEstrategia(AtaqueFurtivo);
            if (tipo === 'cura') monstro.setEstrategia(CuraMagica);
            this.log(`${monstro.getNome()} mudou para ${monstro.estrategiaDeAcao.nome}.`);
            this.render();
        }
    }

    atacarComSelecionado() {
        const monstro = this.horda.find(m => m.getId() === this.idSelecionado);
        if (!monstro) return this.log("Selecione um monstro primeiro!");
        
        const cmd = new AcaoCommand(monstro, this.alvoTreino);
        this.pilhaComandos.push(cmd);
        this.log(cmd.executar());
        this.render();
    }

    executarAtaqueTotal() {
        if (this.horda.length === 0) return this.log("Sua horda está vazia!");
        const comandos = this.horda.map(monstro => new AcaoCommand(monstro, this.alvoTreino));
        const macro = new MacroComando(comandos);
        this.pilhaComandos.push(macro);
        this.log(`<strong>--- ATAQUE TOTAL ---</strong><br>${macro.executar()}`);
        this.render();
    }

    desfazer() {
        if (this.pilhaComandos.length === 0) return this.log("Nenhuma ação para desfazer.");
        const ultimoCmd = this.pilhaComandos.pop();
        this.log(`<span style="color:#ff595e;">${ultimoCmd.desfazer()}</span>`);
        this.render();
    }

    log(msg) {
        const logBox = document.getElementById('log');
        logBox.innerHTML += `<div>${msg}</div>`;
        logBox.scrollTop = logBox.scrollHeight;
    }

    render() {
        document.getElementById('alvo-hp').innerText = this.alvoTreino.hp;
        const listaHTML = document.getElementById('lista-monstros');
        listaHTML.innerHTML = '';
        
        this.horda.forEach(monstro => {
            const isSelected = monstro.getId() === this.idSelecionado;
            const card = document.createElement('div');
            card.className = "monstro-card";
            if (isSelected) card.style.borderColor = "#ffca3a";
            
            card.innerHTML = `
                <strong>${monstro.getNome()}</strong><br>
                Vida: ${monstro.hp}/${monstro.getHpMax()} | ATK: ${monstro.getAtk()}<br>
                Postura: <em>${monstro.estrategiaDeAcao.nome}</em><br>
                <button onclick="facade.selecionarMonstro(${monstro.getId()})">Selecionar</button>
            `;
            listaHTML.appendChild(card);
        });

        const painelControles = document.getElementById('controles-customizacao');
        const avisoSelecao = document.getElementById('aviso-selecao');
        const monstroSelecionado = this.horda.find(m => m.getId() === this.idSelecionado);

        if (monstroSelecionado) {
            painelControles.style.display = 'block';
            avisoSelecao.style.display = 'none';
            document.getElementById('monstro-selecionado-nome').innerText = monstroSelecionado.getNome();
        } else {
            painelControles.style.display = 'none';
            avisoSelecao.style.display = 'block';
        }
    }
}
