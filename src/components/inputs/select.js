import React from "react";

const mySelectInput = props => {
  const opts = props.options;
  
  const handleChange = e => {
    const target = e.target;
    const value = target.value;
    props.changed(value);
  };

  const content = (
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor="form-horizontal-select">
        Country 1
      </label>
      <div className="uk-form-controls">
        <select
          className="uk-select"
          id="form-horizontal-select"
          name={props.name}
          onChange={handleChange}
        >
          {opts.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return content;
};

export default mySelectInput;
