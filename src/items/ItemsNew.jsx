import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message'


const ItemsNew = () => {
  const { register, handleSubmit, errors } = useForm();
  return (
    <form className="item-new_form" onSubmit={handleSubmit(onSubmit)}>
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
        defaultValue={item.notes}
      />
    </form>
  )
}