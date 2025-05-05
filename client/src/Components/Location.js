
import React, { useState, useEffect } from "react";
import axios from "axios";

const Location = () =>{
    const [ip, setIp] = useState(null); 
    const [geoData, setGeoData] = useState(null); 

const fetchIpAddress = async () => {
    try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIp(response.data.ip); 
        } catch (error) {
        console.error("Error fetching IP address:", error.message);
        }
    };
const getGeoLocationData = async () => {
    if (!ip) return; // Ensure IP is available before making the request
    try {
        const response = await axios.get(
            `https://geo.ipify.org/api/v2/country?apiKey=at_4PNUEqZYOR5owoE0hy7h0DKCDDJBA=${ip}`
        );
        setGeoData(response.data); // Set geolocation data in state
        console.log("GeoLocation Data:", response.data);
    } catch (error) {
        console.error("Error fetching geolocation data:", error.message);
        }
    };
useEffect(() => {
        fetchIpAddress();
    }, []);
    
      // Fetch geolocation data when the IP is updated
useEffect(() => {
    if (ip) {
        getGeoLocationData();
        }
    }, [ip]);
    
    
return(
    <div className="location">
        <br />
        <br />
        {ip ? <p>IP Address: {ip}</p> : <p>Loading IP address...</p>}
        {geoData ? (
        <div>
            Country: {geoData.location.country}
            <br />
            Region: {geoData.location.region}
            <br/>
            Time Zone:{geoData.location.timezone}
            <br/>
            City:{geoData.location.city||"not available"}
        </div>
        ) : (
        <p>Loading Geolocation Data...</p>
        )}
    </div>
    );
}

export default Location;
