import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message'
import '../assets/ItemsNew.scss';


const ItemsNew = ({handleNewItem}) => {
  const { register, handleSubmit, errors } = useForm();
  const statuses = ['Icebox', 'Not Started', 'In-Progress', 'Completed']

  const onSubmit = (data, e) => {
    handleNewItem(data, e)
  }
  return (
    <div className="item-new_container">
      <h1>Add Item</h1>
      <form className="item-new_form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          className="name"
          name="name"
          ref={register({required: "Name of item is required"})}
        />
        <ErrorMessage 
          errors={errors} 
          name="name" 
          render={({message}) => <p className="item-new-error">{message}</p> }
        />
        <label htmlFor="status">Status</label>
        <select 
          className="item-status"
          name="status"
          defaultValue=""
          ref={register({ required: "Status is required"})}
        >
        <option disabled value="">--- Select a Status ---</option>
          {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
        </select>
        <ErrorMessage 
          errors={errors} 
          name="statis"
          render={({message}) => <p className="item-new-error">{message}</p> }
        />
        <label htmlFor="item-notes">Notes</label>
        <textarea
          type="textarea"
          cols="30"
          rows="6"
          className="item-notes"
          name="notes"
          ref={register()}
        />
        <button className="add-item_button" type="Submit">Add Item</button>
      </form>
    </div>
  )
}

export default ItemsNew;