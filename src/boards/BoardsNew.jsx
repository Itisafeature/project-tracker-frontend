import React from 'react';
import { useForm } from 'react-hook-form';

const BoardsNew = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="name" type="text" ref={register({required: true})} />
      {errors.name && <span>This field is required</span>}
      <button type="submit">Create Board</button>
    </form>
  )
}

export default BoardsNew;