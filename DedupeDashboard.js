import React, { useState } from 'react';
import axios from 'axios';

const DedupeDashboard = () => {
    const [flags, setFlags] = useState([]);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("/dedupe", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setFlags(res.data.duplicates);
        } catch (err) {
            console.error("Error uploading file:", err);
        }
    };

    return (
        <div>
            <h2>Dedupe-AI Flags</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload & Check</button>
            <ul>
                {flags.map(([i, j], idx) => (
                    <li key={idx}>Potential duplicate between row {i} and {j}</li>
                ))}
            </ul>
        </div>
    );
};

export default DedupeDashboard;
