import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import axios from 'axios';
import ItemFields from '../items/ItemFields';

const BoardsNew = () => {
  const [itemCount, setItemCount] = useState(0);
  const [items, setItems] = useState([]);
  const { register, control, handleSubmit, errors } = useForm({
    defaultValues: {
      item: [{name: ""}]
    }
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "item"
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
      <input name="board[name]" type="text" ref={register({required: true})} />
      {errors.name && <span>This field is required</span>}
      <ul>
        {fields.map((item, index) => (
            <input
              name={`item${[index]}.name`}
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