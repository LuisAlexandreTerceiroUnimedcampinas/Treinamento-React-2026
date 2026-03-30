function InputField(props) {
  const { id: fieldId, type: inputType, placeholder, label, value, onChange } = props;

  return (
    <div className="form-group">
      <label htmlFor={fieldId}>{label}</label>
      <input type={inputType} id={fieldId} placeholder={placeholder} value={value} onChange={onChange} />
      <span className="error-message"></span>
    </div>
  )
}

export default InputField;
