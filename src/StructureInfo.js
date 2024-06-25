import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './StructureInfo.css';

function StructureInfo() {
    let { pdbid } = useParams();
    const location = useLocation();
    const [structureInfo, setStructureInfo] = useState(null);

    useEffect(() => {
        const fetchStructureInfo = async () => {
            const cacheKey = `structureInfo-${pdbid}`;
            const cachedData = sessionStorage.getItem(cacheKey);

            if (cachedData) {
                setStructureInfo(JSON.parse(cachedData));
                return;
            }

            try {
                const IP = `localhost`;
                const response = await fetch(`http://${IP}/rnaprodb/run-script?pdbid=${pdbid}&algorithm=pca&isFirst=true`);
                const data = await response.json();
                sessionStorage.setItem(cacheKey, JSON.stringify(data));
                setStructureInfo(data);
            } catch (error) {
                console.error('Error fetching structure info:', error);
            }
        };

        fetchStructureInfo();
    }, [pdbid]);

    if (!structureInfo) {
        return <div>Loading...</div>;
    }

    const {
        title,
        protein_name,
        pdb_info
    } = structureInfo;

    const classification = pdb_info?.struct_keywords?.pdbx_keywords;
    const organism = pdb_info?.entity_src_gen?.[0]?.pdbx_organism_scientific;
    const expressionSystem = pdb_info?.entity_src_gen?.[0]?.pdbx_host_organism_scientific;
    const authors = pdb_info?.citation?.[0]?.rcsb_authors?.join(', ');
    const experimentalModality = pdb_info?.exptl?.[0]?.method;
    const resolution = pdb_info?.rcsb_entry_info?.resolution_combined?.[0];
    const pubmedId = pdb_info?.citation?.[0]?.pdbx_database_id_pub_med;
    const numberProtEntities = pdb_info?.rcsb_entry_info?.polymer_entity_count_protein;
    const numberRNAEntities = pdb_info?.rcsb_entry_info?.polymer_entity_count_rna;
    const numberDNAEntities = pdb_info?.rcsb_entry_info?.polymer_entity_count_dna;
    const numberHybridEntities = pdb_info?.rcsb_entry_info?.polymer_entity_count_nucleic_acid_hybrid;
    const molecularWeight = pdb_info?.rcsb_entry_info?.molecular_weight;
    const doi = pdb_info?.citation?.[0]?.pdbx_database_id_doi;
    const doiLink = doi ? `https://doi.org/${doi}` : null;
    const pfamId = pdb_info?.rcsb_external_references?.find(ref => ref.type === "Pfam")?.id || "Not available";
    const rfamId = pdb_info?.rcsb_external_references?.find(ref => ref.type === "Rfam")?.id || "Not available";

    return (
        <div id='structureInfoDiv'>
            {protein_name && <p style={{ textAlign: 'center' }}> {protein_name}</p>}
            {classification && <p><strong>Classification:</strong> {classification}</p>}
            {organism && <p><strong>Organism:</strong> {organism}</p>}
            {expressionSystem && <p><strong>Expression System:</strong> {expressionSystem}</p>}
            {doi && <p><strong>DOI:</strong> <a href={doiLink} target="_blank" rel="noopener noreferrer">{doi}</a></p>}
            {authors && <p><strong>Authors:</strong> {authors}</p>}
            {molecularWeight !== undefined && <p><strong>Molecular Weight:</strong> {molecularWeight} kDa</p>}
            {experimentalModality && <p><strong>Experimental Modality:</strong> {experimentalModality}</p>}
            {resolution && <p><strong>Imaging Resolution:</strong> {resolution} Å</p>}
            {pubmedId && <p><strong>PubMed ID:</strong> {pubmedId}</p>}
            {pfamId !== "Not available" && <p><strong>Pfam ID:</strong> {pfamId}</p>}
            {rfamId !== "Not available" && <p><strong>Rfam ID:</strong> {rfamId}</p>}
            {numberProtEntities !== undefined && <p><strong>Number of Protein Entities:</strong> {numberProtEntities}</p>}
            {numberRNAEntities !== undefined && <p><strong>Number of RNA Entities:</strong> {numberRNAEntities}</p>}
            {numberDNAEntities !== undefined && <p><strong>Number of DNA Entities:</strong> {numberDNAEntities}</p>}
            {numberHybridEntities !== undefined && <p><strong>Number of Nucleic Acid Hybrid Entities:</strong> {numberHybridEntities}</p>}
        </div>  
    );
}

export default StructureInfo;

