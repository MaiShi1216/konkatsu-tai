import React, { useEffect, useState } from 'react'
import classes from '@/components/Form/style.css'
import TextField from '@mui/material/TextField'

export type FormType = {
  placeholder: string
  label: string
  type: 'text' | 'password'
  setter: React.Dispatch<React.SetStateAction<string | undefined>>
  editEnable: boolean
  initValue?: string
}

export const Form = (props: FormType) => {
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  useEffect(() => {
    props.setter(props.initValue ? props.initValue : undefined)
  }, [])

  return (
    <div className={classes.textBox}>
      <TextField
        error={isCorrect}
        id="standard-basic"
        label={props.placeholder}
        variant="standard"
        type={props.type}
        helperText={!isCorrect ? undefined : 'Incorrect entry'}
        onChange={(e) => {
          props.setter(e.target.value)
        }}
        defaultValue={props.initValue ? props.initValue : undefined}
        disabled={!props.editEnable}
      />
    </div>
  )
}
