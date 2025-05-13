import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";

const DataTable: React.FC = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const ppeRef = ref(database, "/ppe-detection");

        onValue(ppeRef, (snapshot) => {
            const firebaseData = snapshot.val();
            const formattedData = firebaseData
                ? Object.values(firebaseData)
                      .map((item: any) => ({
                          detected: item.detected ? item.detected.join(", ") : "None",
                          missing: item.missing ? item.missing.join(", ") : "None",
                          timestamp: item.timestamp || "Unknown",
                      }))
                      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) // Zaman damgasına göre sıralama
                : [];
            setData(formattedData);
        });
    }, []);

    return (
        <div className="data-table">
            <h2>PPE Detection Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>Detected PPE</th>
                        <th>Missing PPE</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.detected}</td>
                            <td>{row.missing}</td>
                            <td>{row.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;