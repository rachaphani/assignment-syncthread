
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const MapView = () => {
    const [mapData, setMapData] = useState(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get('http://localhost:3000/api/map', config);
                setMapData(response.data);
            } catch (error) {
                console.error('Error fetching map data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Map View</h2>
            {mapData ? (
                <MapContainer center={mapData.center} zoom={mapData.zoom} style={{ height: '500px', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </MapContainer>
            ) : (
                <p>Loading map data...</p>
            )}
        </div>
    );
};

export default MapView;
