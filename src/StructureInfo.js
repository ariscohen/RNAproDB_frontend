import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './StructureInfo.css';

function StructureInfo() {
    let { pdbid } = useParams();
    const location = useLocation();
    console.log("pdbid", pdbid); // Check if pdbid is defined

    const [structureInfo, setStructureInfo] = useState(null);

    useEffect(() => {
        const fetchStructureInfo = async () => {
            console.log("running!");
            const cacheKey = `structureInfo-${pdbid}`;
            const cachedData = sessionStorage.getItem(cacheKey);

            if (cachedData) {
                console.log("cachedData", cachedData);
                setStructureInfo(JSON.parse(cachedData));
                return;
            }

            try {
                const response = await fetch(`/rnaprodb-backend/rnaprodb/get_struct_info?pdbid=${pdbid}`);
                const data = await response.json();
                console.log("Fetched data", data); // Log the fetched data
                sessionStorage.setItem(cacheKey, JSON.stringify(data));
                setStructureInfo(data);
            } catch (error) {
                console.error('Error fetching structure info:', error);
            }
        };

        if (pdbid) {
            fetchStructureInfo();
        }
    }, [pdbid]);

    if (!structureInfo) {
        return <div>Loading...</div>;
    }

    console.log("structureInfo", structureInfo); // Log structureInfo

    // Extracting data based on the structure
    // const title = structureInfo.citation?.[0]?.title;
    const protein_name = structureInfo.struct?.title;
    const classification = structureInfo.struct_keywords?.pdbx_keywords;
    const organism = structureInfo.entity_src_gen?.[0]?.pdbx_organism_scientific;
    const expressionSystem = structureInfo.entity_src_gen?.[0]?.pdbx_host_organism_scientific;
    const authors = structureInfo.citation?.[0]?.rcsb_authors?.join(', ');
    const experimentalModality = structureInfo.exptl?.[0]?.method;
    const resolution = structureInfo.rcsb_entry_info?.resolution_combined?.[0];
    const pubmedId = structureInfo.citation?.[0]?.pdbx_database_id_pub_med;
    const numberProtEntities = structureInfo.rcsb_entry_info?.polymer_entity_count_protein;
    const numberRNAEntities = structureInfo.rcsb_entry_info?.polymer_entity_count_rna;
    const numberDNAEntities = structureInfo.rcsb_entry_info?.polymer_entity_count_dna;
    const numberHybridEntities = structureInfo.rcsb_entry_info?.polymer_entity_count_nucleic_acid_hybrid;
    const molecularWeight = structureInfo.rcsb_entry_info?.molecular_weight;
    const doi = structureInfo.citation?.[0]?.pdbx_database_id_doi;
    const doiLink = doi ? `https://doi.org/${doi}` : null;
    const pfamId = structureInfo.rcsb_external_references?.find(ref => ref.type === "Pfam")?.id;
    const rfamId = structureInfo.rcsb_external_references?.find(ref => ref.type === "Rfam")?.id;

    // Extracting and formatting dates based on the structure
    const formatDateString = (dateString) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

    const releaseDateRaw = structureInfo.rcsb_accession_info?.initial_release_date;
    const releaseDate = formatDateString(releaseDateRaw);

    const revisionDates = structureInfo.pdbx_audit_revision_history?.map(entry => entry.revision_date) || [];
    const latestRevisionDateRaw = revisionDates.length > 0 ? new Date(Math.max(...revisionDates.map(date => new Date(date)))) : null;
    const latestRevisionDate = formatDateString(latestRevisionDateRaw);

    return (
        <div id='structureInfoDiv'>
            {protein_name && <p style={{ textAlign: 'center' }}> <b>{pdbid}:</b><br/>{protein_name}</p>}
            {classification && <p><strong>Classification:</strong> {classification}</p>}
            {organism && <p><strong>Organism:</strong> {organism}</p>}
            {expressionSystem && <p><strong>Expression system:</strong> {expressionSystem}</p>}
            {doi && <p><strong>DOI:</strong> <a href={doiLink} target="_blank" rel="noopener noreferrer">{doi}</a></p>}
            {releaseDate && <p><strong>Release date:</strong> {releaseDate}</p>}
            {latestRevisionDate && <p><strong>Latest revision date:</strong> {latestRevisionDate}</p>}
            {authors && <p><strong>Authors:</strong> {authors}</p>}
            {molecularWeight !== undefined && <p><strong>Molecular weight:</strong> {molecularWeight} kDa</p>}
            {experimentalModality && <p><strong>Experimental modality:</strong> {experimentalModality}</p>}
            {resolution && <p><strong>Imaging resolution:</strong> {resolution} Å</p>}
            {pubmedId && <p><strong>PubMed ID:</strong> {pubmedId}</p>}
            {pfamId && pfamId !== "Not available" && <p><strong>Pfam ID:</strong> {pfamId}</p>}
            {rfamId && rfamId !== "Not available" && <p><strong>Rfam ID:</strong> {rfamId}</p>}
            {numberProtEntities !== undefined && <p><strong>Number of protein entities:</strong> {numberProtEntities}</p>}
            {numberRNAEntities !== undefined && <p><strong>Number of RNA entities:</strong> {numberRNAEntities}</p>}
            {numberDNAEntities !== undefined && <p><strong>Number of DNA entities:</strong> {numberDNAEntities}</p>}
            {numberHybridEntities !== undefined && <p><strong>Number of NA hybrid entities:</strong> {numberHybridEntities}</p>}
        </div>  
    );
}

export default StructureInfo;