import React from 'react';
import { format } from 'date-fns';

function DataInput({
  id,
  label,
  value,
  onChange
}) {
  const hoje = new Date;
  const dia = hoje.getDate();
  const mes = hoje.getMonth() + 1;
  const ano = hoje.getFullYear();

  const handleDate = ({ target }) => {
    const date = new Date(target.value);
    onChange(date);
  };

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="date"
        value={format(value, 'yyyy-MM-dd')}
        min={`${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`}
        onChange={handleDate}
      />
    </div>
  );
}

export default DataInput;

