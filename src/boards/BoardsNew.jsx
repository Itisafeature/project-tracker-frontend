import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message'
import axios from 'axios';
import ItemFields from '../items/ItemFields';

const BoardsNew = () => {
  const [itemCount, setItemCount] = useState(0);
  const [items, setItems] = useState([]);
  const { register, control, handleSubmit, errors } = useForm({
    defaultValues: {
      items: [{name: ""}]
    }
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "items"
  })

  // const addItem = () => {
    // setItemCount(itemCount + 1);
    // setItems([...items, {id: itemCount}])
  // }

  const onSubmit = async (data) => {
    debugger;
    try {
      const res = await axios.post('/boards/new', data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="board[name]" type="text" ref={register({required: "Name of board is required"})} />
      {/* {errors.board && <span>This field is required</span>} */}
      <ErrorMessage errors={errors} name="board[name]" render={({message}) => <p>{message}</p> }/>
      <ul>
        {fields.map((item, index) => (
            <input
              name={`items[${index}].name`}
              ref={register({ required: true})}
              defaultValue={item.name}
              key={item.id}
            />
        ))
        }
      </ul>
      <button type="button" onClick={() => append({name: ""})}>Add Item</button>
      <button type="submit">Create Board</button>
    </form>
  )
}

export default BoardsNew;