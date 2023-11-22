import { useMemo, useRef, useState } from 'react';
import items from './ids.json';

const pdbids = items.map(item => item.pdbid);

export default function SearchBar() {
    const [items, setItems] = useState(pdbids);
    const [query, setQuery] = useState("");
    const inputRef = useRef();

    const filteredItems = useMemo(() => {
        if (!query) return pdbids;
        return pdbids.filter(item => {
        return item.toLowerCase().includes(query.toLowerCase())
        })
    }, [pdbids, query])

    function onSubmit(e) {
        e.preventDefault();
        const value = inputRef.current.value;
        if (value === "") return 
        setItems(prev => {
            return [...prev, value]
        })
        inputRef.current.value = "";
    }

    return (
        <>
            <input placeholder='Search PDB ID' 
            value={query} 
            onChange={e => setQuery(e.target.value)}
            type='search'
            />
            <br />
            <br />
            <h3>Items</h3>
            {filteredItems.map(item => (
                <div>{item}</div>    
            ))}
        </>
    );
}