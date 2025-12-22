// src/components/layout/FormField.jsx
export default function FormField({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  autoComplete,
}) {
  return (
    <label className="form-field">
      <span>
        {label} {required && <span className="required">*</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
      />
    </label>
  );
}
