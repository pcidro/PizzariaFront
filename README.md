# 🍕 Sistema de Pizzaria - Front-End

Este projeto foi desenvolvido para fornecer uma interface administrativa robusta e moderna, permitindo a gestão eficiente de categorias, produtos e o controle de pedidos da cozinha de uma pizzaria.

## 📋 Índice

- [Descrição Geral e Objetivo](#-descrição-geral-e-objetivo)
- [Repositório Back-End](#-repositório-back-end)
- [Principais Funcionalidades](#-principais-funcionalidades)
- [Tecnologias e Bibliotecas](#-tecnologias-e-bibliotecas)
- [Instalação e Configuração](#️-instalação-e-configuração)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Integração Front-End e Back-End](#-integração-front-end-e-back-end)
- [Principais Aprendizados](#-principais-aprendizados)
- [Boas Práticas e Arquitetura](#️-boas-práticas-e-arquitetura)
- [Possíveis Evoluções e Melhorias Futuras](#-possíveis-evoluções-e-melhorias-futuras)

##  DEPLOY

👉 **[https://pizzaria-front-ecru.vercel.app](https://pizzaria-front-ecru.vercel.app)**


## 🎯 Descrição Geral e Objetivo

O objetivo deste projeto é modernizar e facilitar a operação de uma pizzaria, focando principalmente no lado administrativo e na cozinha. Através de um painel de controle intuitivo, os administradores podem gerenciar o cardápio (adicionando produtos e categorias) e acompanhar os pedidos em tempo real (ou via atualização manual) garantindo um fluxo de trabalho otimizado do balcão até a entrega final.

## 🔗 Repositório Back-End

Este projeto é exclusivamente o **Front-End** da aplicação. A API (Back-End) foi desenvolvida separadamente e é responsável por toda a regra de negócio, banco de dados e autenticação.

Você pode encontrar o repositório do Back-End completo aqui:
👉 **[https://github.com/pcidro/Pizzaria](https://github.com/pcidro/Pizzaria)**

## ✨ Principais Funcionalidades

- **Autenticação Segura:** Login e registro de usuários com controle de sessão utilizando JWT em cookies.
- **Gestão de Categorias:** Criação de novas categorias para organizar o cardápio.
- **Gestão de Produtos:** Cadastro de produtos com nome, descrição, preço (formatado) e upload de imagem. Permite exclusão de produtos.
- **Painel da Cozinha (Dashboard):** Visualização de pedidos pendentes organizados por mesa.
- **Detalhes e Finalização de Pedido:** Modal para visualizar todos os itens do pedido com cálculo automático do total e possibilidade de marcá-lo como finalizado/entregue.
- **Interface Responsiva:** Layout adaptável para uso em desktop ou dispositivos móveis, com sidebar nativa e menu mobile.

## 🚀 Tecnologias e Bibliotecas

O projeto utiliza tecnologias modernas do ecossistema React, garantindo alta performance e manutenibilidade:

- **[Next.js](https://nextjs.org/) (App Router):** Framework principal utilizado em sua versão mais recente (16+), com React 19.
- **[TypeScript](https://www.typescriptlang.org/):** Para tipagem estática e segurança do código.
- **[Tailwind CSS (v4)](https://tailwindcss.com/):** Para estilização utility-first de forma ágil e padronizada.
- **[Shadcn UI](https://ui.shadcn.com/) / Base UI:** Componentes de interface acessíveis e altamente customizáveis.

## 🛠️ Instalação e Configuração

Para rodar o projeto localmente, certifique-se de ter o Node.js instalado e siga os passos abaixo:

1.  **Clone o repositório:**

    ```bash
    git clone <url-do-repositorio>
    cd frontend
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configuração de Variáveis de Ambiente:**
    Crie um arquivo `.env.local` na raiz do projeto e adicione a URL da sua API:

    ```env
    NEXT_PUBLIC_URL=http://localhost:3333
    ```

4.  **Execute o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

5.  Acesse `http://localhost:3000` em seu navegador.

## 📁 Estrutura de Pastas

A arquitetura do projeto foi pensada para escalar, dividindo claramente as responsabilidades:

- **`src/app/`**: Rotas da aplicação e layouts baseados no App Router do Next.js (`/dashboard`, `/login`, `/register`).
- **`src/actions/`**: Server Actions para mutações e comunicação segura com o Back-End sem expor lógicas de API no client.
- **`src/components/`**: Componentes reutilizáveis, divididos em módulos lógicos (`dashboard`, `dialogs`, `forms`, `ui`).
- **`src/lib/`**: Funções utilitárias, cliente de API customizado (`apiClient`), gerenciamento de cookies e autenticação.
- **`src/types/`**: Definições de tipagem TypeScript para os modelos de dados (Categoria, Produto, Pedidos, etc).

## 🔌 Integração Front-End e Back-End

A comunicação com o Back-End é feita através de um cliente API utilitário (`src/lib/api.ts`). Ele gerencia as requisições nativas utilizando o `fetch`, adicionando automaticamente o header de `Authorization` com o token JWT armazenado em cookies de forma segura (`src/lib/cookies.ts`).

Para leitura de dados em tempo de renderização (como buscar os pedidos da cozinha na página do Dashboard), o fluxo ocorre predominantemente do lado do servidor (Server Components).
Para envios de formulários (criar produto, criar categoria, login), a aplicação utiliza **Server Actions** (`src/actions`), o que evita a criação de endpoints intermediários no Front-End e simplifica a revalidação do cache local (usando `revalidatePath`).

## 🧠 Principais Aprendizados

Durante o desenvolvimento deste projeto, obtive diversas experiências enriquecedoras. Em especial:

- **Aprimorei meus conhecimentos sobre integração entre Front-End e Back-End.**
- **Organizei melhor o código utilizando Server Actions**, simplificando o envio e tratamento de dados de formulários diretamente no servidor.
- **Separei componentes que utilizam `"use client"` e os integrei dentro de Server Components**, otimizando a carga na rede e mantendo o processamento pesado na nuvem.
- **Melhorei a separação de responsabilidades** entre componentes de servidor (para buscar dados) e componentes de cliente (para interatividade).
- **Evoluí na organização, reutilização e manutenção dos componentes**, especialmente usando bibliotecas como Shadcn e Base UI.
- **Desenvolvi uma compreensão melhor do fluxo de dados** entre a interface do usuário, o servidor (Next.js) e a API externa.

## 🏗️ Boas Práticas e Arquitetura

- **Design Utility-First:** O uso do Tailwind CSS reduziu a necessidade de arquivos de estilos espalhados, mantendo tudo coeso junto à marcação.
- **Autenticação por Cookies `HttpOnly`:** A leitura do token via funções server-side protege melhor contra ataques XSS em comparação com o armazenamento em localStorage.
- **Isolamento do Cliente de API:** Criar o `apiClient` abstraiu as repetições de código no momento de passar cabeçalhos (Headers) para a API principal, tornando o código mais limpo e padronizado.
- **Feedback Visual:** Implementação de loadings (estados de carregamento) durante chamadas lentas à API e tipagem de possíveis mensagens de erro e sucesso nas actions.

## 🚀 Possíveis Evoluções e Melhorias Futuras

- **WebSockets (Real-time):** Substituir a atualização manual via botão ("Refresh") da lista de pedidos por conexões via Socket.io para que pedidos apareçam instantaneamente na cozinha.
- **Paginação e Filtros:** Implementar paginação na listagem de produtos no cardápio, para caso ele cresça consideravelmente.
- **Dashboard Analítico:** Adicionar gráficos com vendas mensais, itens mais vendidos e relatórios de desempenho na tela principal.
- **Perfil do Usuário:** Interface para gerenciamento de dados do usuário logado (alterar senha, nome, foto, etc).

---
