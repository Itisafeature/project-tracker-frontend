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
      items: [{name: "", notes: ""}]
    }
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "items"
  })
  const statuses = ['Icebox', 'Not Started', 'In-Progress', 'Completed']

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
      <ErrorMessage errors={errors} name="board[name]" render={({message}) => <p>{message}</p> }/>
      <ul>
        {fields.map((item, index) => (
          <div key={item.id} className="item">
            <h3>Item</h3>
            <label>
            item name  
              <input
                type="text"
                name={`items[${index}].name`}
                ref={register({ required: "Item name is required"})}
                defaultValue={item.name}
              />
            </label>
            <ErrorMessage errors={errors} name={`items[${index}].name`} render={({message}) => <p>{message}</p> }/>
            <label>
              <select defaultValue="" name={`items[${index}].status`} ref={register()}>
              <option disabled value="">--- Select a Status ---</option>
                {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </label>
            <textarea
              type="textarea"
              name={`items[${index}].notes`}
              ref={register()}
              defaultValue={item.notes}
            />
          </div>
        ))
        }
      </ul>
      <button type="button" onClick={() => append({name: "", notes: ""})}>Add Item</button>
      <button type="submit">Create Board</button>
    </form>
  )
}

export default BoardsNew;