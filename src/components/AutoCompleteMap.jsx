import React, { useState, useEffect, useRef } from "react";
import "../styles/autocompletemap.css";

export default function AutocompleteInput({ value, onChange }) {
    const [input, setInput] = useState(value);
    const [suggestions, setSuggestions] = useState([]);
    const wrapperRef = useRef(null); // <- Ref para detectar clics fuera

    // Cierra el dropdown si se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSuggestions([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (input.length < 3) {
            setSuggestions([]);
            return;
        }

        const controller = new AbortController();

        const fetchSuggestions = async () => {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${encodeURIComponent(input)}&countrycodes=ar&addressdetails=1`,
                    { signal: controller.signal }
                );
                const data = await res.json();

                const filtered = data
                    .map((place) => {
                        const addr = place.address;
                        const state = addr.state || "";
                        const partido = addr.county || "";
                        const ciudad = addr.city || addr.town || addr.village || "";
                        const barrio = addr.suburb || addr.neighbourhood || "";

                        const isInBuenosAires =
                            state.includes("Buenos Aires") || state.includes("Ciudad Autónoma");

                        if (!isInBuenosAires) return null;

                        const name = barrio || ciudad || partido;
                        if (!name) return null;

                        const label = `${name}, Buenos Aires`;

                        return {
                            key: label,
                            display_name: label,
                            full_data: place,
                        };
                    })
                    .filter(Boolean);

                const unique = [];
                const seen = new Set();
                for (const item of filtered) {
                    if (!seen.has(item.key)) {
                        seen.add(item.key);
                        unique.push(item);
                    }
                }

                setSuggestions(unique);
            } catch (err) {
                if (err.name !== "AbortError") console.error(err);
            }
        };

        const timeout = setTimeout(fetchSuggestions, 600);
        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [input]);

    const handleSelect = (place) => {
        setInput(place.display_name);
        onChange(place.display_name);
        setSuggestions([]);
    };

    return (
        <div className="autocomplete-wrapper" ref={wrapperRef}>
            <input
                type="text"
                placeholder="Buscar por barrio o ciudad en Buenos Aires"
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
                    onChange(e.target.value);
                }}
            />
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((s) => (
                        <li key={s.key} onClick={() => handleSelect(s)}>
                            {s.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
