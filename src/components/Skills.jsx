import React, { useState, useEffect } from "react";
import { Badge, InputGroup, FormControl } from "react-bootstrap";
import Autocomplete from "react-autocomplete-select";
import skills from "./../assets/data/skills.json";

export default function Skills(props) {
  const [state, setState] = useState([]);
  useEffect(() => {
    if (props.edit) setState(JSON.parse(localStorage.getItem("resumeBuilder.skills"))) || [];
  }, []);
  return (
    <div>
      <h3 className="subtitle">Skills</h3>
      <div className="tag-list">
        {state.map((t) => {
          return (
            <Badge className="tag" variant="secondary" key={t}>
              {t}{" "}
              <button
                onClick={() =>
                  setState((prev) => {
                    localStorage.setItem(
                      "resumeBuilder.skills",
                      JSON.stringify([...prev].filter((i) => i !== t))
                    );
                    return [...prev].filter((i) => i !== t);
                  })
                }
                className="close-skill"
              >
                ×
              </button>
            </Badge>
          );
        })}
      </div>

      <Autocomplete
        searchPattern={"containsString"}
        placeholder="Type to search"
        maxOptionsLimit={5}
        getItemValue={(i) => i.text}
        onSelect={(selectedValue) => {
          console.log({ selectedValue });
          setState((prev) => {
            localStorage.setItem(
              "resumeBuilder.skills",
              JSON.stringify([...new Set([...prev, selectedValue])])
            );
            return [...new Set([...prev, selectedValue])];
          });
        }}
        itemsData={skills}
        selectOnBlur={false}
        inputJSX={(props) => (
          <InputGroup>
            <FormControl {...props} onSubmit={(e) => e.preventDefault} />
          </InputGroup>
        )}
      />
    </div>
  );
}
