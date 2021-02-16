import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message'
import axios from 'axios';
import '../assets/BoardsNew.scss'

const BoardsNew = () => {
  const history = useHistory();
  const { register, control, handleSubmit, errors } = useForm({
    defaultValues: {
      items: [{name: "", notes: ""}]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  })
  const statuses = ['Icebox', 'Not Started', 'In-Progress', 'Completed']

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/boards/new', data)
      history.push('/boards')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="board-form-container">
      <form className="new-board-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="new-board-name"><h1>Name of Board</h1></label>
        <input name="board[name]" id="new-board-name" type="text" ref={register({required: "Name of board is required"})} />
        <ErrorMessage 
          errors={errors} 
          name="board[name]" 
          render={({message}) => <p className="board-new-error">{message}</p> }
        />
        {fields.map((item, index) => (
          <div key={item.id} className="item">
            <h4>Item</h4>
            <label htmlFor={`new-board-item-name${index}`}>Item Name</label>
            <input
              type="text"
              className="item-name"
              id={`new-board-item-name${index}`}
              name={`items[${index}].name`}
              ref={register({ required: "Item name is required"})}
              defaultValue={item.name}
            />
            <ErrorMessage 
              errors={errors} 
              name={`items[${index}].name`} 
              render={({message}) => <p className="board-new-error">{message}</p> }
            />
            <label htmlFor={`new-board-item-status${index}`}>Status</label>
            <select 
              className="item-status"
              id={`new-board-item-status${index}`}
              defaultValue="" 
              name={`items[${index}].status`} 
              ref={register({ required: "Status is required"})}
            >
            <option disabled value="">--- Select a Status ---</option>
              {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
            <ErrorMessage 
              errors={errors} 
              name={`items[${index}].status`} 
              render={({message}) => <p className="board-new-error">{message}</p> }
            />
            <label htmlFor={`new-board-item-notes${index}`}>Notes</label>
            <textarea
              type="textarea"
              cols="30"
              rows="6"
              className="item-notes"
              id={`new-board-item-notes${index}`}
              name={`items[${index}].notes`}
              ref={register()}
              defaultValue={item.notes}
            />
            <button className="remove-item" type="button" onClick={() => remove(index)}>Remove Item</button>
          </div>
        ))
        }
        {fields.length < 4 && <button className="add-item" type="button" onClick={() => append({name: "", notes: ""})}>Add Item</button>}
        {fields.length === 4 && <p className="board-new-error">You can add additional items later!</p>}
        <button className="create-board" type="submit">Create Board</button>
      </form>
    </div>
  )
}

export default BoardsNew;