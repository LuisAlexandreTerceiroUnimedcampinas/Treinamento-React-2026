function InputField({
  label = 'Senha',
  type = 'password',
  id = 'senha',
  placeholder = 'Digite sua senha',
}) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} placeholder={placeholder} />
      <span className="error-message" id={`${id}-error`}></span>
    </div>
  )
}

export default InputField