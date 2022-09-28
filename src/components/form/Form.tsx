import React, { useEffect, useState } from 'react'
import classes from '@/components/Form/style.css'
import TextField from '@mui/material/TextField'

export type FormType = {
  placeholder: string
  label: string
  type: 'text' | 'password'
  setter: React.Dispatch<React.SetStateAction<string | undefined>>
  editEnable: boolean
  pattern?: RegExp
  initValue?: string
}

const whiteSpacePattern = /(^\s+)|(\s+$)/
const japanesePattern = /([^\x21-\x7E\uFF61-\uFF9F]+)|([ｦ-ﾟ]+)/ // 半角文字でない または 半角カタカナである 場合に日本語とする

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
          console.log(e.target.value === '')
          if (props.pattern) {
            if (!props.pattern.test(e.target.value) || whiteSpacePattern.test(e.target.value) || e.target.value === '') {
              setIsCorrect(true)
            } else {
              setIsCorrect(false)
            }
          } else {
            if (whiteSpacePattern.test(e.target.value) || e.target.value === '') {
              setIsCorrect(true)
            } else {
              setIsCorrect(false)
            }
          }
          props.setter(e.target.value)
        }}
        defaultValue={props.initValue ? props.initValue : undefined}
        disabled={!props.editEnable}
      />
    </div>
  )
}
