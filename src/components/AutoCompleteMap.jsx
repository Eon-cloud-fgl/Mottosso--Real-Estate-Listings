import React, { useState, useEffect } from "react";
import "../styles/autocompletemap.css";

export default function AutocompleteInput({ value, onChange }) {
    const [input, setInput] = useState(value);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (input.length < 3) {
            setSuggestions([]);
            return;
        }

        const controller = new AbortController();

        const fetchSuggestions = async () => {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&countrycodes=ar&addressdetails=1`,
                    { signal: controller.signal }
                );
                const data = await res.json();
                setSuggestions(data);
            } catch (err) {
                if (err.name !== "AbortError") console.error(err);
            }
        };

        const timeout = setTimeout(fetchSuggestions, 300);
        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [input]);

    const handleSelect = (place) => {
        setInput(place.display_name);
        onChange(place.display_name); // actualiza `query`
        setSuggestions([]);
    };

    return (
        <div className="autocomplete-wrapper">
            <input
                type="text"
                placeholder="Buscar por ubicación"
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                    onChange(e.target.value); // actualiza también al escribir manual
                }}
            />
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((s) => (
                        <li key={s.place_id} onClick={() => handleSelect(s)}>
                            {s.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
