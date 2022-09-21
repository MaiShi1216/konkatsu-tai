import React, { useEffect } from 'react'
import classes from '@/components/signup/style.css'

export type FormType = {
  placeholder: string
  label: string
  type: 'text' | 'password'
  setter: React.Dispatch<React.SetStateAction<string | undefined>>
  editEnable: boolean
  initValue?: string
}

export const Form = (props: FormType) => {
  useEffect(() => {
    props.setter(props.initValue ? props.initValue : undefined)
  }, [])

  return (
    <div className={classes.textBox}>
      <p>{props.label}</p>
      <input
        className={classes.input}
        type={props.type}
        placeholder={props.placeholder}
        onChange={(e) => {
          props.setter(e.target.value)
        }}
        defaultValue={props.initValue ? props.initValue : undefined}
        disabled={!props.editEnable}
      />
    </div>
  )
}
