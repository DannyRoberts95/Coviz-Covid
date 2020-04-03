import React from "react";

const mySelectInput = props => {
  const opts = props.options;
  const handleChange = e => {
    
    const target = e.target;
    const value = target.value;
    props.changed([...value])
  };
  const content = (
    <select name="selectedCountries" onChange={handleChange}>
      {opts.map((item, i) => (
        <option key={i} value={item}>
          {item}
        </option>
      ))}
    </select>
  );

  return content;
};

export default mySelectInput;
