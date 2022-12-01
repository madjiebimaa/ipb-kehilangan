import { Chip, FormControl, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPostCharacteristics } from "../state";

export default function MultipleInputField() {
  const [values, setValues] = useState([]);
  const [currValue, setCurrValue] = useState("");
  const dispatch = useDispatch();

  const handleKeyUp = (e) => {
    if (e.keyCode === 9) {
      setValues((oldState) => [...oldState, e.target.value]);
      setCurrValue("");
    }
  };

  const handleChange = (e) => {
    setCurrValue(e.target.value);
  };

  const handleDelete = (item, index) => {
    let arr = [...values];
    arr.splice(index, 1);

    setValues(arr);
  };

  useEffect(() => {
    dispatch(setPostCharacteristics({ characteristics: values }));
  }, [values]);

  return (
    <FormControl>
      <div className={"container"}>
        {values.map((item, index) => (
          <Chip
            key={`${item}-${index}`}
            size="small"
            onDelete={() => handleDelete(item, index)}
            label={item}
            sx={{ mr: "0.5rem" }}
          />
        ))}
      </div>
      <Input
        placeholder="Characteristics"
        value={currValue}
        onChange={handleChange}
        onKeyDown={handleKeyUp}
      />
    </FormControl>
  );
}
