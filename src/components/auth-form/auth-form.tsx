import React, {FC} from "react"
import AuthStyles from './auth-form.module.css'

type TAuthForm = {
  title?: string
  onSubmit: () => void
}

export const AuthForm: FC<TAuthForm> = ({children, onSubmit, title}) => {
  return (
    <div className={AuthStyles.container}>
      <h2 className={`${AuthStyles.head} text text_type_main-medium mb-6`}>{title}</h2>
      <form 
        className={AuthStyles.form}
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}>
        {children}
      </form>
    </div>
  )
}