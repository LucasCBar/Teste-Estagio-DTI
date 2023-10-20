# Petshop Selector

Link para o site do projeto: https://teste-estagio-dti.vercel.app

## Descrição

Este é um software desenvolvido em React para realização do teste prático proposto pela DTI, onde a proposto é ajudar o Sr. Eduardo, proprietário de um canil em Belo Horizonte, a encontrar o melhor petshop para banhar seus cães. O software considera distância, preços e a data para determinar o melhor petshop disponível.

## Instruções para Executar o Sistema

1. Clone o repositório para sua máquina local:

   ```bash
   git clone https://github.com/LucasCBar/Teste-Estagio-DTI.git

2. Instale as dependências do projeto:
  ```bash
    npm install

2. Execute o aplicativo:
  ```bash
    npm install

5. O aplicativo estará disponível em http://localhost:3000 no seu navegador.

## Premissas Assumidas
- As informações de preços e distâncias dos petshops são constantes.
- O usuário fornecerá a data e a quantidade de cães pequenos e grandes como entrada.
- E a saída precisa informar para o usuário qual o petshops com o melhor preço, e se o preço for o mesmo qual o menos distante.

## Decisões de Projeto
- O sistema foi desenvolvido em React.
- A lógica principal foi separada em funções para calcular o melhor petshop.
- Os preços dos petshops são ajustados com base na data e nos tipos de cães.

