import React, { useEffect, useState } from 'react';

function fetchJson(url, opts) {
    return fetch(url, opts).then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || res.statusText);
        }
        return res.json();
    });
}

// Entity Manager component for CRUD operations on any entity type defined in entitiesConfig
export default function EntityManager({ entity }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({});
    const [dropdownOptions, setDropdownOptions] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);

    const apiHost = process.env.NODE_ENV === 'production'
        ? `http://${window.location.hostname}:53261`
        : 'http://localhost:53261';
    const base = `${apiHost}/api/${entity.endpoint}`;

    const isCompositeKey = (endpoint) => 
        endpoint.includes('character_items') || 
        endpoint.includes('character_quests') || 
        endpoint.includes('monster_areas');

    const load = () => {
        setLoading(true);
        setError(null);
        fetchJson(base)
            .then((data) => setItems(Array.isArray(data) ? data : []))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        const fetchDropdownOptions = async () => {
            const options = {};
            for (const field of entity.fields) {
                if (field.type === 'select' && field.optionsEndpoint) {
                    try {
                        const data = await fetchJson(`${apiHost}/api/${field.optionsEndpoint}`);
                        options[field.name] = Array.isArray(data) ? data : [];
                    } catch (err) {
                        console.error(`Error fetching options for ${field.name}:`, err);
                        options[field.name] = [];
                    }
                }
            }
            setDropdownOptions(options);
        };
        fetchDropdownOptions();
    }, [entity]);

    useEffect(() => { load(); }, [entity]);

    function handleChange(e) {
        const { name, type, value, checked } = e.target;
        setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    }

    function handleEdit(item) {
        setForm(item);
        setIsEditMode(true);
    }

    function handleReset() {
        const empty = {};
        entity.fields.forEach((f) => { empty[f.name] = f.type === 'checkbox' ? false : ''; });
        setForm(empty);
        setIsEditMode(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        const payload = {};
        entity.fields.forEach((f) => { payload[f.name] = form[f.name]; });

        try {
            const idField = entity.idField || 'id';
            const hasCompositeKeys = (entity.endpoint.includes('character_items') && form.characterID && form.itemID) ||
                                    (entity.endpoint.includes('character_quests') && form.characterID && form.questID) ||
                                    (entity.endpoint.includes('monster_areas') && form.monsterID && form.areaID);
            
            if (isEditMode && (form[idField] || hasCompositeKeys)) {
                let url = `${base}`;
                if (entity.endpoint.includes('character_items') && form.characterID && form.itemID) {
                    url = `${base}/${form.characterID}/${form.itemID}`;
                } else if (entity.endpoint.includes('character_quests') && form.characterID && form.questID) {
                    url = `${base}/${form.characterID}/${form.questID}`;
                } else if (entity.endpoint.includes('monster_areas') && form.monsterID && form.areaID) {
                    url = `${base}/${form.monsterID}/${form.areaID}`;
                } else {
                    url = `${base}/${form[idField]}`;
                }
                
                await fetchJson(url, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            } else {
                await fetchJson(base, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            }
            handleReset();
            load();
        } catch (err) {
            setError(err.message);
        }
    }

    function handleDelete(item) {
        const idField = entity.idField || 'id';
        const confirmMsg = isCompositeKey(entity.endpoint)
            ? `Delete this ${entity.label} entry?`
            : `Delete ${entity.label} #${item[idField]}?`;
        
        if (!window.confirm(confirmMsg)) return;
        setError(null);
        
        let url = base;
        if (entity.endpoint.includes('character_items')) {
            url = `${base}/${item.characterID}/${item.itemID}`;
        } else if (entity.endpoint.includes('character_quests')) {
            url = `${base}/${item.characterID}/${item.questID}`;
        } else if (entity.endpoint.includes('monster_areas')) {
            url = `${base}/${item.monsterID}/${item.areaID}`;
        } else {
            url = `${base}/${item[idField]}`;
        }
        
        fetchJson(url, { method: 'DELETE' })
            .then(() => load())
            .catch((err) => setError(err.message));
    }

    useEffect(() => {
        handleReset();
    }, [entity]);

    return (
        <div className="entity-manager">
            <div className="entity-form">
                <h3>{entity.label} — Create / Edit</h3>
                <form onSubmit={handleSubmit}>
                    {entity.fields.map((f) => (
                        <label key={f.name} style={{ display: 'block', marginBottom: 8 }}>
                            {f.label}
                            {f.type === 'checkbox' ? (
                                <input
                                    name={f.name}
                                    type="checkbox"
                                    checked={!!form[f.name]}
                                    onChange={handleChange}
                                    style={{ marginLeft: 8 }}
                                />
                            ) : f.type === 'select' ? (
                                <select
                                    name={f.name}
                                    value={form[f.name] ?? ''}
                                    onChange={handleChange}
                                    required={f.required}
                                    style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }}
                                >
                                    <option value="">-- Select {f.label} --</option>
                                    {(dropdownOptions[f.name] || []).map((opt) => (
                                        <option key={opt[f.optionValue]} value={opt[f.optionValue]}>
                                            {opt[f.optionLabel]}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    name={f.name}
                                    type={f.type === 'number' ? 'number' : 'text'}
                                    value={form[f.name] ?? ''}
                                    onChange={handleChange}
                                    required={f.required}
                                    style={{ display: 'block', width: '100%', padding: 6, marginTop: 4 }}
                                />
                            )}
                        </label>
                    ))}
                    <div style={{ marginTop: 8 }}>
                        <button type="submit">{isEditMode ? 'Update' : 'Create'}</button>
                        <button type="button" onClick={handleReset} style={{ marginLeft: 8 }}>Reset</button>
                        <button type="button" onClick={load} style={{ marginLeft: 8 }}>Refresh</button>
                    </div>
                    {error && <div style={{ color: '#b00020', marginTop: 8 }}>Error: {error}</div>}
                </form>
            </div>

            <div className="entity-list" style={{ marginLeft: 16, flex: 1 }}>
                <h3>{entity.label} — List</h3>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                {entity.displayFields.map((f) => (
                                    <th key={f.name} style={{ border: '1px solid #eee', padding: 6 }}>{f.label}</th>
                                ))}
                                <th style={{ border: '1px solid #eee', padding: 6 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 && (
                                <tr><td colSpan={entity.displayFields.length + 1}>No items</td></tr>
                            )}
                            {items.map((it, idx) => (
                                <tr key={`${entity.endpoint}-${idx}`}>
                                    {entity.displayFields.map((f) => (
                                        <td key={f.name} style={{ border: '1px solid #eee', padding: 6 }}>
                                            {String(it[f.name] ?? '')}
                                        </td>
                                    ))}
                                    <td style={{ border: '1px solid #eee', padding: 6, display: 'flex', gap: 8 }}>
                                        <button onClick={() => handleEdit(it)} aria-label={`Edit ${entity.label}`} title="Edit" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6 }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="currentColor" />
                                                <path d="M20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" fill="currentColor" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleDelete(it)} aria-label={`Delete ${entity.label}`} title="Delete" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, color: 'var(--danger)' }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                                <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z" fill="currentColor" />
                                                <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
