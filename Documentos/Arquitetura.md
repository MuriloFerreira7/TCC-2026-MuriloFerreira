Arquitetura do Aplicativo

1. Objetivo

Este documento define as regras arquiteturais, estruturais e de padronização que devem ser seguidas durante o desenvolvimento do aplicativo.

A arquitetura será baseada na estrutura de um projeto Expo/React Native utilizando TypeScript e Expo Router, mantendo uma separação clara entre:

telas;

componentes reutilizáveis;

serviços e regras de acesso aos dados;

tipos/interfaces;

funções utilitárias;

configuração de navegação.

O objetivo é evitar que a aplicação se transforme em um conjunto de telas com lógica misturada, facilitando manutenção, testes e evolução do projeto.

2. Tecnologias e padrão geral

A aplicação utilizará inicialmente:

Expo

React Native

TypeScript

Expo Router

JavaScript/TypeScript moderno

Git/GitHub

Firebase

O código-fonte será escrito em PT-BR, incluindo:

nomes de variáveis;

nomes de funções;

nomes de tipos;

nomes de componentes;

comentários;

textos internos do código, quando fizer sentido;

documentação.

Exemplo:

const nomeUsuario = 'Murilo';

function calcularProgresso() {
  // ...
}

Não utilizar:

const userName = 'Murilo';

function calculateProgress() {
  // ...
}

3. Estrutura de pastas

A estrutura base do projeto seguirá a organização abaixo:

app-diario/
│
├── app/
│   ├── _layout.tsx
│   ├── TelaLogin.tsx
│   ├── TelaCadastro.tsx
│   ├── TelaInicio.tsx
│   ├── TelaNovaMateria.tsx
│   ├── TelaNovoRegistro.tsx
│   ├── TelaNovoTopico.tsx
│   ├── TelaRegistros.tsx
│   ├── TelaTopicos.tsx
│   ├── TelaTopicosMateria/
│   │   └── TelaTopicosMateriaId.tsx
│   └── TelaEditarRegistro/
│       └── TelaEditarRegistroId.tsx
│
├── assets/
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
│
├── src/
│   ├── componentes/
│   │   ├── Cabecalho.tsx
│   │   ├── CartaoMateria.tsx
│   │   ├── CartaoRegistro.tsx
│   │   └── CartaoTopico.tsx
│   │
│   ├── services/
│   │   ├── MateriaService.ts
│   │   ├── RegistroService.ts
│   │   └── TopicoService.ts
│   │
│   ├── telas/
│   │   ├── TelaLogin.tsx
│   │   ├── TelaCadastro.tsx
│   │   ├── TelaInicio.tsx
│   │   ├── TelaNovaMateria.tsx
│   │   ├── TelaNovoRegistro.tsx
│   │   ├── TelaNovoTopico.tsx
│   │   ├── TelaRegistros.tsx
│   │   ├── TelaTopicos.tsx
│   │   ├── TelaTopicosMateria.tsx
│   │   └── TelaEditarRegistro.tsx
│   │
│   ├── types/
│   │   ├── Materia.ts
│   │   ├── Registro.ts
│   │   └── Topico.ts
│   │
│   └── utils/
│       └── Alerta.ts
│
├── app.json
├── package.json
├── tsconfig.json
└── README.md

Observação importante: o ZIP fornecido atualmente possui simultaneamente app/, navigation/, screens/ e src/telas/. Essa duplicação deve ser eliminada. Como o projeto já utiliza Expo Router (expo-router/entry), a navegação antiga baseada em navigation/AppNavigator.js e screens/ não deve permanecer na arquitetura final.

4. Responsabilidade de cada pasta

4.1 app/

A pasta app/ será responsável pela estrutura de rotas do Expo Router.

Ela deve conter apenas o necessário para representar as rotas da aplicação e organizar parâmetros de navegação.

A regra é:

app/ define onde o usuário pode navegar; src/ contém a implementação e as regras da aplicação.

Exemplo:

app/
└── TelaEditarRegistro/
    └── TelaEditarRegistroId.tsx

A rota recebe o parâmetro e encaminha os dados para a tela responsável.

A lógica de negócio não deve ficar espalhada nos arquivos de rota.

5. Telas

As telas representam as interfaces completas que o usuário acessa.

Todas as telas deverão possuir Tela no início do nome.

Exemplos:

TelaLogin.tsx
TelaCadastro.tsx
TelaInicio.tsx
TelaNovoRegistro.tsx
TelaEditarRegistro.tsx
TelaTopicos.tsx

É proibido criar telas com nomes genéricos como:

Login.tsx
Cadastro.tsx
Home.tsx
Register.tsx
Screen1.tsx

O padrão obrigatório é:

TelaNomeDaTela.tsx

Exemplo:

export default function TelaInicio() {
  // ...
}

6. Componentes

A pasta:

src/componentes/

será utilizada para componentes reutilizáveis.

Exemplos:

Cabecalho.tsx
CartaoMateria.tsx
CartaoRegistro.tsx
CartaoTopico.tsx
BotaoPrincipal.tsx
CampoTexto.tsx

Um componente deve ser criado quando uma parte da interface:

for reutilizada em mais de uma tela;

possuir comportamento próprio;

representar uma unidade visual independente;

puder ser isolada sem prejudicar a compreensão da tela.

Exemplo:

function CartaoMateria({ nome, descricao }: Props) {
  return (
    <View>
      <Text>{nome}</Text>
      <Text>{descricao}</Text>
    </View>
  );
}

Não criar componentes simplesmente para dividir uma tela em dezenas de arquivos sem necessidade.

7. Serviços

A pasta:

src/services/

será responsável pelo acesso e manipulação dos dados.

Exemplos:

MateriaService.ts
RegistroService.ts
TopicoService.ts

Os serviços deverão concentrar operações como:

listar;

buscar;

cadastrar;

atualizar;

excluir;

consultar API;

enviar dados para API.

Exemplo:

export async function listarMaterias(): Promise<Materia[]> {
  // chamada da API
}

A tela não deverá implementar diretamente chamadas HTTP.

Evitar:

function TelaInicio() {
  fetch('http://servidor/materias')
    .then(...)
}

Preferir:

function TelaInicio() {
  const materias = await listarMaterias();
}

Dessa forma, caso a API seja alterada posteriormente, a alteração ficará concentrada no serviço.

8. Tipos

A pasta:

src/types/

será responsável pelas definições de tipos utilizados pela aplicação.

Exemplo:

Materia.ts
Registro.ts
Topico.ts
Usuario.ts

Exemplo:

export interface Materia {
  id: number;
  nome: string;
  descricao: string;
  corDestaque?: string;
}

Os tipos devem representar entidades ou estruturas importantes do sistema.

Não criar tipos desnecessariamente para valores extremamente simples.

9. Funções utilitárias

A pasta:

src/utils/

será destinada a funções genéricas que possam ser utilizadas em diferentes partes da aplicação.

Exemplos:

Alerta.ts
FormatarData.ts
ValidarEmail.ts
FormatarNumero.ts

Uma função utilitária não deve depender diretamente de uma tela específica.

Exemplo:

export function formatarData(data: Date): string {
  // ...
}

10. Convenção para nomes de arquivos

Todos os arquivos do projeto deverão utilizar PascalCase.

Exemplos corretos:

TelaLogin.tsx
TelaInicio.tsx
MateriaService.ts
RegistroService.ts
CartaoMateria.tsx
Materia.ts
Alerta.ts

Exemplos incorretos:

telaLogin.tsx
tela_login.tsx
materia-service.ts
materia_service.ts
cartaoMateria.tsx

10.1 Regra para arquivos de tela

Arquivos que representam telas obrigatoriamente deverão começar com:

Tela

Exemplo:

TelaLogin.tsx
TelaCadastro.tsx
TelaInicio.tsx
TelaRegistros.tsx

11. Convenção para variáveis

Todas as variáveis deverão utilizar camelCase.

Exemplos:

const nomeUsuario = 'Murilo';
const quantidadeRegistros = 10;
const materiaSelecionada = materia;
const dataCadastro = new Date();

Não utilizar:

const NomeUsuario = 'Murilo';
const nome_usuario = 'Murilo';
const nomeusuario = 'Murilo';
const nome_usuario_atual = 'Murilo';

12. Constantes

Constantes que representam valores fixos da aplicação deverão utilizar:

LETRA_MAIUSCULA_COM_UNDERSCORE

Exemplos:

const API_URL = 'https://exemplo.com/api';
const TEMPO_ALERTA = 3000;
const LIMITE_REGISTROS = 50;
const NOME_APLICACAO = 'Diário de Estudos';

Não utilizar:

const apiUrl = '...';
const tempoAlerta = 3000;

quando o valor representar uma constante global ou uma configuração fixa.

12.1 Atenção ao const do TypeScript

A palavra-chave const não significa automaticamente que o nome deve estar em maiúsculas.

Por exemplo:

const nomeUsuario = 'Murilo';

continua correto.

A regra de MAIUSCULA_COM_UNDERSCORE será aplicada a constantes conceituais/fixas, e não a toda variável declarada com const.

13. Convenção para funções

Todas as funções deverão utilizar nomes no infinitivo.

Exemplos:

calcularProgresso()
mostrarMensagem()
listarMaterias()
buscarMateria()
adicionarMateria()
atualizarMateria()
removerMateria()
validarCadastro()
formatarData()
carregarDados()
salvarRegistro()

Evitar nomes que representem apenas substantivos:

progresso()
materias()
dados()
registro()

Evitar também nomes vagos:

fazer()
executar()
funcao()
processar()
coisa()

O nome deve indicar claramente o que a função faz.

14. Funções de CRUD

Quando uma entidade possuir operações de CRUD, os nomes deverão seguir um padrão consistente.

Listar

listarMaterias()

Buscar uma entidade específica

buscarMateriaPorId(id)

Adicionar

adicionarMateria(dados)

Atualizar

atualizarMateria(id, dados)

Remover

removerMateria(id)

O mesmo padrão deverá ser utilizado para outras entidades.

Exemplo:

listarRegistros()
buscarRegistroPorId()
adicionarRegistro()
atualizarRegistro()
removerRegistro()

15. Componentes React

Componentes React deverão utilizar PascalCase.

Exemplo:

export default function CartaoMateria() {
  // ...
}

As propriedades deverão utilizar camelCase.

Exemplo:

<CartaoMateria
  nome={materia.nome}
  descricao={materia.descricao}
  corDestaque={materia.corDestaque}
/>

16. Estado dos componentes

Estados React deverão utilizar camelCase.

Exemplo:

const [materias, setMaterias] = useState<Materia[]>([]);
const [materiaSelecionada, setMateriaSelecionada] =
  useState<Materia | null>(null);

O setter deverá seguir o padrão:

set + NomeDaVariavel

Exemplo:

materias → setMaterias
nomeUsuario → setNomeUsuario
materiaSelecionada → setMateriaSelecionada

17. Estilos

Os estilos específicos de uma tela deverão permanecer próximos da tela.

Exemplo:

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
});

O nome padrão do objeto de estilos será:

estilos

Exemplo:

<View style={estilos.container}>

Não criar arquivos de estilo separados para cada tela sem necessidade.

Quando houver estilos ou padrões visuais realmente compartilhados entre várias telas, eles poderão ser extraídos posteriormente para uma estrutura específica de estilos.

18. Navegação

O projeto utilizará Expo Router como sistema principal de navegação.

Não deverão existir simultaneamente dois sistemas independentes de navegação.

Portanto, a arquitetura final não deverá utilizar:

navigation/AppNavigator.js

junto com:

expo-router

A navegação deverá ser centralizada no Expo Router.

O arquivo:

app/_layout.tsx

será responsável pela configuração global da navegação.

19. Parâmetros de rota

Quando uma tela precisar receber um identificador pela URL/rota, o parâmetro deverá ser claramente identificado.

Exemplo conceitual:

TelaEditarRegistro/[id]

A tela deverá recuperar o identificador através dos recursos do Expo Router e então solicitar o registro correspondente ao serviço.

Fluxo:

Usuário
   ↓
Tela
   ↓
Recebe ID
   ↓
Service
   ↓
Busca registro
   ↓
Tela exibe dados

A tela não deverá manipular diretamente a fonte de dados.

20. Separação de responsabilidades

A aplicação deverá seguir aproximadamente o seguinte fluxo:

┌──────────────────────┐
│       TELA           │
│ Interface do usuário │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│      SERVICE         │
│ Regras de acesso     │
│ aos dados            │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│ API / BANCO DE DADOS │
│ Fonte dos dados      │
└──────────────────────┘

Os tipos ficam disponíveis para representar os dados utilizados pelas diferentes camadas:

src/types/

E as funções genéricas ficam em:

src/utils/

21. O que uma tela deve fazer

Uma tela deve ser responsável principalmente por:

exibir componentes;

receber entrada do usuário;

controlar estado visual;

chamar funções de serviço;

realizar validações simples relacionadas à interface;

realizar navegação;

apresentar mensagens ao usuário.

Exemplo:

async function salvar() {
  if (!nome.trim()) {
    mostrarAlerta('Informe o nome');
    return;
  }

  await adicionarMateria({
    nome,
    descricao,
  });

  router.back();
}

Mesmo nesse exemplo, a operação de persistência permanece no service.

22. O que uma tela não deve fazer

Evitar colocar diretamente dentro das telas:

chamadas HTTP complexas;

SQL;

regras de negócio extensas;

manipulação direta de banco de dados;

código duplicado;

grandes funções com múltiplas responsabilidades.

Exemplo que deve ser evitado:

async function salvar() {
  const resposta = await fetch(...);

  const dados = await resposta.json();

  // dezenas de linhas tratando API,
  // conversão de dados,
  // regras de negócio etc.
}

O ideal é:

async function salvar() {
  await adicionarMateria(dados);
}

E no service:

export async function adicionarMateria(
  dados: Omit<Materia, 'id'>
): Promise<Materia> {
  // comunicação com a API
}

23. Regras de importação

Os imports deverão ser organizados de maneira lógica.

Preferencialmente:

bibliotecas externas;

componentes React Native;

componentes próprios;

services;

types;

utils.

Exemplo:

import { useState } from 'react';
import { Text, View } from 'react-native';

import Cabecalho from '../componentes/Cabecalho';
import { listarMaterias } from '../services/MateriaService';
import { Materia } from '../types/Materia';

24. Tipagem

O projeto utilizará TypeScript de forma efetiva.

Evitar:

const dados: any = ...

quando for possível representar corretamente o tipo.

Preferir:

const materia: Materia = ...

Ou:

const materias: Materia[] = ...

O uso de any deverá ser evitado e somente utilizado quando houver uma justificativa técnica.

25. Regras para comentários

Comentários deverão explicar por que determinada decisão existe, e não simplesmente repetir o que o código já mostra.

Ruim:

// Incrementa o contador
contador++;

Bom:

// O identificador é incrementado localmente enquanto a aplicação
// ainda não utiliza o banco de dados definitivo.
proximoId++;

Não encher o código de comentários óbvios.

O código deve ser escrito de maneira suficientemente clara para que comentários sejam necessários apenas em pontos realmente relevantes.

26. Tratamento de erros

Operações que possam falhar deverão possuir tratamento adequado.

Exemplo:

try {
  await adicionarMateria(dados);
  mostrarAlerta('Matéria cadastrada com sucesso');
} catch (erro) {
  mostrarAlerta('Não foi possível cadastrar a matéria');
}

Os erros técnicos não deverão ser simplesmente ignorados:

catch (erro) {
}

Quando necessário, o erro deverá ser registrado para facilitar a identificação do problema.

27. Fluxo de dados

O fluxo esperado será:

AÇÃO DO USUÁRIO
       ↓
     TELA
       ↓
    SERVICE
       ↓
      API
       ↓
     BANCO
       ↓
      API
       ↓
    SERVICE
       ↓
     TELA
       ↓
USUÁRIO VISUALIZA

Exemplo para cadastrar uma matéria:

Usuário preenche formulário
        ↓
TelaNovaMateria
        ↓
validar dados
        ↓
adicionarMateria()
        ↓
MateriaService
        ↓
API
        ↓
Banco de dados
        ↓
Resposta
        ↓
TelaNovaMateria
        ↓
Mensagem de sucesso

28. Regras para novos arquivos

Antes de criar um novo arquivo, verificar:

O código realmente precisa estar separado?

Ele pertence a uma tela?

É um componente reutilizável?

É uma operação relacionada a dados?

É um tipo?

É uma função utilitária?

Existe outro arquivo que já possui responsabilidade semelhante?

Não criar arquivos apenas para pequenas funções que poderiam permanecer corretamente agrupadas.

29. Regras para novos componentes

Antes de criar um componente, verificar se:

ele será reutilizado;

possui responsabilidade própria;

melhora a organização;

reduz duplicação.

Não transformar cada View, Text ou TouchableOpacity em um componente separado sem necessidade.

30. Regras para Services

Cada entidade principal deverá possuir seu próprio service.

Exemplo:

MateriaService.ts
RegistroService.ts
TopicoService.ts
UsuarioService.ts

O service não deverá conter código de interface.

Não utilizar:

Alert.alert(...)

dentro de um service.

O service deve retornar dados ou lançar erros. A tela decide como apresentar o resultado ao usuário.

31. Arquitetura atual e evolução

A estrutura existente no projeto fornecido apresenta uma mistura de abordagens:

app/
navigation/
screens/
src/telas/

Isso não deverá ser mantido na versão final.

Como o projeto já utiliza:

expo-router/entry

e possui:

app/_layout.tsx

o Expo Router será considerado o sistema oficial de navegação.

A pasta navigation/ será removida.

A pasta screens/ será removida.

A implementação das telas será mantida de forma organizada em src/telas/, enquanto app/ será utilizada para as rotas do Expo Router.

32. Regra de ouro da arquitetura

Cada parte do projeto deve possuir uma responsabilidade clara.

app/
→ rotas e navegação

src/telas/
→ interfaces completas das telas

src/componentes/
→ componentes reutilizáveis

src/services/
→ acesso e manipulação dos dados

src/types/
→ definição dos tipos

src/utils/
→ funções genéricas reutilizáveis

assets/
→ recursos visuais

Se um arquivo começar a acumular responsabilidades de diferentes categorias, ele deverá ser reavaliado e, se necessário, dividido.

33. Checklist para implementação

Antes de considerar uma funcionalidade pronta, verificar:

O arquivo possui nome em PascalCase.

Se for uma tela, o nome começa com Tela.

Variáveis utilizam camelCase.

Constantes conceituais utilizam MAIUSCULA_COM_UNDERSCORE.

Funções estão no infinitivo.

Componentes utilizam PascalCase.

Props utilizam camelCase.

Dados possuem tipos TypeScript.

Acesso à API está no Service.

A tela não possui lógica de persistência.

Não existe código duplicado desnecessariamente.

Não existe sistema de navegação paralelo ao Expo Router.

Comentários explicam decisões relevantes.

Erros são tratados adequadamente.

Todo o código novo está escrito em PT-BR.

34. Exemplo completo

Uma funcionalidade de matéria deverá seguir aproximadamente:

app/
└── TelaNovaMateria.tsx
        │
        ↓
src/telas/
└── TelaNovaMateria.tsx
        │
        ├──────────────→ src/componentes/
        │
        ├──────────────→ src/services/MateriaService.ts
        │                       │
        │                       ↓
        │                      API
        │
        └──────────────→ src/types/Materia.ts

Exemplo de service:

import { Materia } from '../types/Materia';

export async function adicionarMateria(
  dados: Omit<Materia, 'id'>
): Promise<Materia> {
  // Comunicação com a API.
}

Exemplo de tela:

import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { adicionarMateria } from '../services/MateriaService';

export default function TelaNovaMateria() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  async function salvarMateria() {
    if (!nome.trim()) {
      return;
    }

    await adicionarMateria({
      nome,
      descricao,
    });
  }

  return (
    <View>
      <Text>Nova matéria</Text>

      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Nome da matéria"
      />

      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descrição"
      />

      <TouchableOpacity onPress={salvarMateria}>
        <Text>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

35. Padrão obrigatório resumido

Elemento

Padrão

Arquivos

PascalCase

Telas

TelaNomeDaTela

Componentes

PascalCase

Variáveis

camelCase

Props

camelCase

Estados

camelCase

Constantes conceituais

MAIUSCULA_COM_UNDERSCORE

Funções

Infinitivo

Services

NomeService.ts

Types

Nome.ts

Código

PT-BR

Navegação

Expo Router

Rotas

Pasta app/

Telas

Pasta src/telas/

Componentes

Pasta src/componentes/

Serviços

Pasta src/services/

Tipos

Pasta src/types/

Utilitários

Pasta src/utils/

36. Decisão arquitetural

Esta arquitetura deverá ser considerada o padrão oficial do projeto.

Novas funcionalidades deverão seguir estas regras desde o início, evitando criar exceções individuais.

Caso uma necessidade futura exija alteração da arquitetura, a alteração deverá ser feita de maneira consciente e refletida neste documento, em vez de simplesmente introduzir uma nova estrutura paralela.

