import React from "react";

const Input = ({ name, label, error, size, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-warning">{error}</div>}
    </div>
  );
};

export default Input;
