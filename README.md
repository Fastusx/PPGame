# Motor de Combate e Customização para RPG de Turno

Este projeto consiste em um protótipo de motor de combate tático baseado em turnos para RPG, desenvolvido de forma nativa utilizando **HTML5, CSS3 e JavaScript Vanilla**. O principal objetivo da aplicação é demonstrar a aplicação prática de **6 padrões de projeto (Design Patterns)** essenciais para construir um código desacoplado, escalável e de fácil manutenção.

O projeto foi desenvolvido originalmente como um desafio prático de arquitetura de software para a disciplina de Padrões de Projeto no IFPB.

---

## Funcionalidades Principais

- **Fábrica de Clones:** Permite duplicar monstros base instantaneamente para o combate.
- **Customização Dinâmica:** Mecânica para equipar itens (escudos, runas) e alterar os atributos de Vida e Ataque em tempo de execução.
- **IA Intercambiável:** Alternância dinâmica de estratégias de combate (Ataque Físico, Ataque Furtivo ou Cura Mágica).
- **Linha do Tempo com Undo:** Registro histórico das jogadas que permite desfazer a última ação tomada no turno.
- **Interface Desacoplada:** Toda a complexidade lógica do motor do jogo é isolada das interações da interface gráfica (UI).

---

## Padrões de Projeto Aplicados (Design Patterns)

A arquitetura do sistema foi estruturada dividindo os padrões em três categorias fundamentais:

### 1. Padrões Criacionais e Infraestrutura
* **Prototype:** Implementado através de um método `clone()` na entidade de criaturas, permitindo a geração rápida de novas instâncias idênticas em combate sem reexecutar lógicas pesadas de inicialização.
* **Dependency Injection:** O motor de cálculo de dano e logs é injetado explicitamente na classe do monstro, garantindo que a criatura não fique rigidamente presa a uma única regra de negócio.

### 2. Padrões de Comportamento e Customização
* **Strategy:** Organiza as diferentes lógicas de ação (ataques e curas). O monstro encapsula essa estratégia e pode alterná-la dinamicamente conforme a necessidade da partida.
* **Decorator:** Utilizado para envolver o monstro base com modificadores dinâmicos (como 'Runa de Fogo' ou 'Escudo'). Os decoradores interceptam e acumulam bônus aos métodos de ataque e defesa sem a necessidade de herança.

### 3. Padrões de Controle e Interface
* **Command:** Cada ação do turno é tratada como um objeto contendo os métodos `executar()` e `desfazer()`, armazenados em uma estrutura de pilha (*Stack*) para suportar o mecanismo de *Undo*.
* **Facade:** Centraliza o gerenciamento de criaturas, instâncias e histórico na classe `MotorDeJogoFacade`. Isso impede que os scripts que escutam a interface gráfica (HTML) conheçam as regras profundas do motor.

---

## Tecnologias Utilizadas

- **HTML5:** Estruturação semântica da interface do jogo.
- **CSS3:** Layout responsivo para os painéis de customização e logs.
- **JavaScript (ES6+):** Programação Orientada a Objetos (POO), manipulação dinâmica do DOM e implementação dos padrões de projeto de forma nativa (Vanilla).

---

## Como Executar o Projeto

Como o projeto utiliza tecnologias web puras e nativas, não há necessidade de instalar dependências complexas (Node.js, Webpack, etc).

1. Clone o repositório para sua máquina local:
   ```bash
   git clone [https://github.com/Fastusx/PPGame.git](https://github.com/Fastusx/PPGame.git)
