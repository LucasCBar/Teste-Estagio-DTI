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

  const handleDateChange = (date) => {
    setData(date);
  };

  const getDiaDaSemana = () => {
    const diaSemana = format(data, 'EEEE');
    return diaSemana;
  };

  function calcularPrecoTotal(diaSemana, caesPequenos, caesGrandes) {
    const meuCaninoFeliz = {
      nome: 'Meu Canino Feliz',
      distancia: 2,
      precoPequeno: diaSemana ? 20 : 20 * 1.2,
      precoGrande: diaSemana ? 40 : 40 * 1.2,
    };

    const vaiRex = {
      nome: 'Vai Rex',
      distancia: 1.7,
      precoPequeno: diaSemana ? 15 : 20,
      precoGrande: diaSemana ? 50 : 55,
    };

    const chowChawgas = {
      nome: 'ChowChawgas',
      distancia: 0.8,
      precoPequeno: 30,
      precoGrande: 45,
    };

    const precoTotalMeuCaninoFeliz = caesPequenos.value * meuCaninoFeliz.precoPequeno + caesGrandes.value * meuCaninoFeliz.precoGrande;
    const precoTotalVaiRex = caesPequenos.value * vaiRex.precoPequeno + caesGrandes.value * vaiRex.precoGrande;
    const precoTotalChowChawgas = caesPequenos.value * chowChawgas.precoPequeno + caesGrandes.value * chowChawgas.precoGrande;

    let melhorPetshop = meuCaninoFeliz;
    let menorPreco = precoTotalMeuCaninoFeliz;

    if (precoTotalVaiRex < menorPreco) {
      melhorPetshop = vaiRex;
      menorPreco = precoTotalVaiRex;
    }

    if (precoTotalChowChawgas < menorPreco) {
      melhorPetshop = chowChawgas;
      menorPreco = precoTotalChowChawgas;
    }

    return { nome: melhorPetshop.nome, precoTotal: menorPreco };
  }

  const calcularMelhorPetshop = (event) => {
    event.preventDefault();

    if ((caesPequenos.value == '' && caesGrandes.value == '') || (caesPequenos.value == 0 && caesGrandes.value == 0)) return

    const diaSemana = getDiaDaSemana() !== 'Saturday' && getDiaDaSemana() !== 'Sunday';

    const melhorPetshop = calcularPrecoTotal(diaSemana, caesPequenos, caesGrandes);

    setResultado({
      nome: melhorPetshop.nome,
      precoTotal: melhorPetshop.precoTotal,
    });
  }

  return (
    <div className='Teste'>
      <h2>Encontre o Melhor Petshop</h2>
      <form>
        <DataInput
          label="Selecione a data"
          value={data}
          onChange={handleDateChange}
        />
        <br />
        <Input
          label="Cães pequenos"
          id="cãesPequenos"
          type="number"
          {...caesPequenos}
        />
        <br />
        <Input
          label="Cães grandes"
          id="cãesGrandes"
          type="number"
          {...caesGrandes}
        />
        <br />
        <button onClick={calcularMelhorPetshop}>Calcular</button>
      </form>
      <div>
        {resultado && (<p> Melhor petshop para {format(data, 'dd/MM/yyyy')} </p>)}
        {resultado && (<p> Petshop: {resultado.nome}.</p>)}
        {resultado && (<p> Preço total: R${resultado.precoTotal}</p>)}
      </div>
    </div>
  );
}

export default PetshopSelector;
