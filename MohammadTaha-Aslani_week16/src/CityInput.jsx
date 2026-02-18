import { useState } from "react";

import cities from "./cities";

function CityAutocomplete() {
  const [value, setValue] = useState("");

  const getSuggestion = (input) => {
    if (!input) return "";
    const lower = input.toLowerCase();
    return cities.find((c) => c.toLowerCase().startsWith(lower)) || "";
  };

  const suggestion = getSuggestion(value);
  const ghostSuffix = suggestion ? suggestion.slice(value.length) : "";

  const handleKeyDown = (e) => {
    if (e.key === "Tab" && ghostSuffix) {
      e.preventDefault();
      setValue(suggestion);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          padding: "4px 8px",
          fontSize: 16,
          fontFamily: "inherit",
          whiteSpace: "pre",
          pointerEvents: "none",
          userSelect: "none",
        }}>
          <span style={{ color: "transparent" }}>{value}</span>
          <span style={{ color: "#aaa" }}>{ghostSuffix}</span>
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a city..."
          autoComplete="off"
          spellCheck="false"
          style={{
            position: "relative",
            fontSize: 16,
            fontFamily: "inherit",
            padding: "4px 8px",
            border: "1px solid #ccc",
            borderRadius: 4,
            background: "transparent",
            outline: "none",
            width: 220,
          }}
        />
      </div>
    </div>
  );
}

export default CityAutocomplete;