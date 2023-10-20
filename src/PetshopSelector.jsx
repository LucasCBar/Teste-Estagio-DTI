import React from 'react';
import Input from './Form/Input';
import useForm from './Hooks/useForm';
import { format } from 'date-fns';
import DataInput from './Form/DataInput';

function PetshopSelector() {
  const caesPequenos = useForm();
  const caesGrandes = useForm();
  const [resultado, setResultado] = React.useState(null);
  const [data, setData] = React.useState(new Date());
  const [error, setError] = React.useState(null);

  const handleDate = (data) => {
    setData(data);
  };

  const getDiaDaSemana = () => {
    const diaSemana = format(data, 'EEEE');
    return diaSemana;
  };

  function validateEntrada(value) {
    setError(null);

    if (value <= -1) {
      setError('Preencha com um número valido!');
      return false;
    }
    return true;
  }

  function calcularPrecoTotal(diaSemana, caesPequenos, caesGrandes) {
    const petshops = [
      {
        nome: 'Meu Canino Feliz',
        distancia: 2,
        precoPequeno: diaSemana ? 20 : 20 * 1.2,
        precoGrande: diaSemana ? 40 : 40 * 1.2,
      },
      {
        nome: 'Vai Rex',
        distancia: 1.7,
        precoPequeno: diaSemana ? 15 : 20,
        precoGrande: diaSemana ? 50 : 55,
      },
      {
        nome: 'ChowChawgas',
        distancia: 0.8,
        precoPequeno: 30,
        precoGrande: 45,
      }
    ];

    const precos = petshops.map(petshop => {
      const precoCaesPequeno = petshop.precoPequeno * caesPequenos.value
      const precoCaesGrandes = petshop.precoGrande * caesGrandes.value

      return {
        nome: petshop.nome,
        distancia: petshop.distancia,
        precoCaesPequeno,
        precoCaesGrandes,
        precoTotal: precoCaesPequeno + precoCaesGrandes
      }
    });

    let melhorPreco = [precos[0]]

    for (let i = 1; i < precos.length; i++) {
      if (precos[i].precoTotal <= Math.min(melhorPreco.map(price => price.precoTotal))) {
        if (precos[i].precoTotal == Math.min(melhorPreco.map(price => price.precoTotal))) {
          melhorPreco.push(precos[i]);
          continue;
        }
        melhorPreco = [precos[i]]
      }
    }

    const petshopProximo = melhorPreco.reduce((prev, curr) => prev.distancia < curr.distancia ? prev : curr);

    return petshopProximo;
  }

  const calcularMelhorPetshop = (event) => {
    event.preventDefault();

    if (validateEntrada(caesPequenos.value) && validateEntrada(caesGrandes.value)) {
      if (caesPequenos.value + caesGrandes.value == 0) {
        setError('Insira os valores!');
      } else {
        const diaSemana = getDiaDaSemana() !== 'Saturday' && getDiaDaSemana() !== 'Sunday';
        const melhorPetshop = calcularPrecoTotal(diaSemana, caesPequenos, caesGrandes);
        setResultado(melhorPetshop);
      }
    }
  }

  return (
    <div className='Conteudo'>
      <h2>Encontre o Melhor Petshop</h2>
      <form>
        <DataInput
          label="Selecione a data"
          value={data}
          onChange={handleDate}
        />
        <br />
        <Input
          label="Número de cães pequenos"
          id="cãesPequenos"
          type="number"
          {...caesPequenos}
        />
        <br />
        <Input
          label="Número de cães grandes"
          id="cãesGrandes"
          type="number"
          {...caesGrandes}
        />
        <br />
        <button onClick={calcularMelhorPetshop}>Calcular</button>
      </form>
      <div>
        {!error && resultado && (<p> Melhor petshop para {format(data, 'dd/MM/yyyy')} </p>)}
        {!error && resultado && (<p> Petshop: {resultado.nome}. Distância: {resultado.distancia} Km</p>)}
        {!error && resultado && (<p> Preço total: R${resultado.precoTotal}</p>)}
        <p>{error}</p>
      </div>
    </div>
  );
}

export default PetshopSelector;
