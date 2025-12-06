const FormField = ({
  labelText,
  inputType,
  inputName,
  inputValue,
  onInputChange,
  required,
}) => {
  return (
    <label className="form-field">
      <span>{labelText}</span>
      <input
        type={inputType}
        name={inputName}
        value={inputValue}
        onChange={onInputChange}
        required={required}
      />
    </label>
  );
};

export default FormField;
