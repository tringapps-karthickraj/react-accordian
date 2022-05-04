import React from 'react'
import { useForm } from "react-hook-form";
import '../assets/form.css'

export default function Form() {
    const { register, handleSubmit , formState: { errors }, } = useForm();
   function onSubmit(data){
       console.log(console.log(data));
    }
  return (
        <div className='align'>
            <h2>Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input className={errors.firstName ? 'input bordererr':'input'} {...register("firstName", { required: true, maxLength: 20 })} />
                <div className='err'>
                    {errors.firstName?.type === 'required'  && <div>firstName is required !</div>}
                    {errors.firstName?.type === 'maxLength'  && <div>Maxlength is 20 !</div>}
                </div>
              </div>
              <div>
                  <div className='err'>
                    <input className={errors.lastName ? 'input bordererr':'input'} {...register("lastName", {  required: true, maxLength: 20})} />
                    {errors.lastName?.type === 'required'  && <div>lastName is required !</div>}
                    {errors.lastName?.type === 'maxLength'  && <div>Maxlength is 20 !</div>}
                  </div>
              </div>
              <div>
                <input className={errors.age ? 'input bordererr':'input'} type="number" {...register("age", {  required: true,min:18,max:99})} /> 
                <div className='err'>
                {errors.age?.type === 'required'  && <div>age is required !</div>}
                {errors.age?.type === 'min'  && <div>Minimum age is 18 !</div>}
                {errors.age?.type === 'max'  && <div>Maximum age is 99 !</div>}
                </div>
                
              </div>
              <div>
                <input className={errors.email ? 'input bordererr':'input'} {...register("email", {  required: true, pattern: /\S+@\S+\.\S+/})} />
                <div className='err'>
                    {errors.email?.type === 'required'  && <div>email is required</div>}
                    {errors.email?.type === 'pattern'  && <div>Invalid email</div>}
                </div>
           
              </div>
              <div>
                <button className='buttonform' type='submit'>submit</button>
             </div>
            </form>
        </div>
     
  )
}
