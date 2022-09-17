import React from 'react'
import classes from '@/components/signup/style.css'

export type CheckButtonPropsType = {
  label: string
  type: 'hobby' | 'favorite'
  setter: (value: string, isAddition: boolean) => void
  initChecked: boolean
}

export const CheckButton = (props: CheckButtonPropsType): JSX.Element => {
  return (
    <>
      <input
        id={props.label}
        type="checkbox"
        defaultChecked={props.initChecked}
        className={props.type === 'hobby' ? classes.inputHobbyButton : classes.inputTypeButton}
        onChange={(e) => {
          props.setter(props.label, e.target.checked)
        }}
      ></input>
      <label htmlFor={props.label} className={props.type === 'hobby' ? classes.hobbyButton : classes.typeButton}>
        {props.label}
      </label>
    </>
  )
}
