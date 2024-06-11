import { useMemo, useState } from 'react';
import items from './ids.json';

const pdbids = items.map(item => item.pdbid);

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [notFound, setNotFound] = useState(false);

    const filteredItems = useMemo(() => {
        if (!query) {
            setNotFound(false);
            return pdbids;
        }
        const filtered = pdbids.filter(item => item.toLowerCase().includes(query.toLowerCase()));
        setNotFound(filtered.length === 0);
        return filtered;
    }, [query]);

    function onSubmit(e) {
        e.preventDefault(); // Prevent the default form submission behavior
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    placeholder='Search PDB ID'
                    value={query} 
                    onChange={e => setQuery(e.target.value)}
                    type='search'
                />
            </form>
            {notFound && <div style={{ color: 'red' }}>ID not found</div>}
            <br />
            <h3>Items</h3>
            {filteredItems.map(item => (
                <div key={item}>{item}</div>    
            ))}
        </>
    );
}