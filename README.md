# Country Explorer
Projeto desenvolvido como **teste técnico para vaga de frontend utilizando Angular**.

Aplicação web desenvolvida em **Angular** que permite explorar países do mundo utilizando a API pública **REST Countries**.
O projeto permite **buscar, filtrar, ordenar e visualizar detalhes de países**, além de navegar entre países vizinhos.

---

# Demo

A aplicação permite:

* Buscar países por nome
* Filtrar países por região
* Ordenar países por diferentes critérios
* Visualizar detalhes de um país
* Navegar para países vizinhos (border countries)
* Layout responsivo (mobile e desktop)

---

# Tecnologias Utilizadas

* **Angular (Standalone Components)**
* **TypeScript**
* **TailwindCSS**
* **REST Countries API**
* **Angular Signals**
* **RxJS**
* **Angular Router**

---

# API Utilizada

Este projeto consome dados da API:

REST Countries API

Endpoint utilizado:

```
https://restcountries.com/v3.1/all
```

Campos solicitados:

```
name
capital
population
flags
region
cca3
area
borders
```

---

# Instalação do Projeto

## 1️- Clonar repositório

```
git clone https://github.com/GioSalvador/country-explorer
```

Entrar na pasta:

```
cd country-explorer
```

---

## 2️- Instalar dependências

```
npm install
```

---

## 3️- Rodar aplicação

```
ng serve
```

ou

```
npm start
```

---

## 4️- Acessar no navegador

```
http://localhost:4200
```

---

# Build para Produção

Para gerar build:

```
ng build
```

Os arquivos serão gerados em:

```
dist/
```

---

# Arquitetura do Projeto

Estrutura simplificada:

```
src/app
 ├── features
 │   └── countries
 │        ├── components
 │        │     ├── country-card
 │        │     └── skeleton-country-card
 │        │
 │        ├── pages
 │        │     ├── country-list
 │        │     └── country-detail
 │        │
 │        └── services
 │              └── country.service.ts
 │
 └── app.routes.ts
```

### Organização

| Pasta      | Função                          |
| ---------- | ------------------------------- |
| components | Componentes reutilizáveis       |
| pages      | Páginas principais da aplicação |
| services   | Comunicação com API             |
| routes     | Configuração de navegação       |

---

# Funcionalidades Implementadas

## 1️- Listagem de Países

A página inicial exibe uma lista de países contendo:

* Bandeira
* Nome
* Capital
* População
* Área territorial
* Região

Os dados são carregados via `CountryService`.

---

## 2- Busca por Nome

É possível buscar países digitando no campo:

```
Search for a country...
```

A busca:

* ignora maiúsculas/minúsculas
* prioriza países cujo nome **começa com o termo digitado**

Exemplo:

```
pesquisa: bra

Brazil
Brunei
...
```

---

## 3- Filtro por Região

Filtro disponível:

```
All Regions
Africa
Americas
Asia
Europe
Oceania
```

Permite restringir os países exibidos de acordo com a região geográfica.

---

## 4- Ordenação

A lista pode ser ordenada por:

```
Sort by Name
Sort by Population
Sort by Area
```

### Name

Ordem alfabética.

### Population

Do maior para o menor.

### Area

Do maior território para o menor.

---

## 5- Página de Detalhes do País

Ao clicar em um país na listagem, o usuário é direcionado para:

```
/countries/:code
```

Exemplo:

```
/countries/BRA
```

A página exibe:

* Bandeira
* Nome
* Capital
* Região
* População
* Área
* Países vizinhos

---

## 6- Navegação entre Fronteiras

Na página de detalhes existe a seção:

```
Border Countries
```

Cada país vizinho é exibido como botão.

Ao clicar, o usuário navega para o país correspondente.

Exemplo:

```
Brazil → Argentina
```

---

## 7- Paginação

A lista de países é paginada para melhorar performance.

Configuração atual:

```
12 países por página
```

Controles disponíveis:

```
« primeira página
‹ página anterior
› próxima página
» última página
```

---

## 8- Skeleton Loading

Durante o carregamento inicial da API são exibidos **Skeleton Cards**, simulando os cards reais enquanto os dados não chegam.

Isso melhora a experiência do usuário.

---

## 9- Responsividade

A interface foi construída com **TailwindCSS** e adaptada para diferentes telas.

### Desktop

```
Search | Region | Sort
```

### Mobile

```
Search
Region
Sort
```

Todos os filtros ficam centralizados.

---

# Gerenciamento de Estado

O projeto utiliza **Angular Signals** para estado reativo.

Principais signals:

```
searchTerm
region
currentPage
loading
allCountries
sortBy
```

Também foram utilizados `computed()` para derivar estados:

```
filteredCountries
paginatedCountries
totalPages
```

---

# Serviço de Países

O `CountryService` é responsável por:

* buscar dados da API
* mapear dados da API para um modelo interno

Interface utilizada:

```
export interface Country {
  name: string
  capital: string
  population: number
  flag: string
  code: string
  region: string
  area: number
}
```
# Possíveis Melhorias Futuras

Algumas melhorias que podem ser adicionadas:

* Infinite scroll
* Testes unitários
* Cache de requisições
* Melhorias de acessibilidade (ARIA)
* Deploy automático




