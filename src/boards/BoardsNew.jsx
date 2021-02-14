import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { processForm } from '../helpers/helpers.js';

const BoardsNew = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
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
      <button type="submit">Create Board</button>
    </form>
  )
}

export default BoardsNew;