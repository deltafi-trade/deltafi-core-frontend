import { useState, useEffect } from "react";
import { EXCLUDED_COUNTRIES } from "../constants/geoBlock";
import axios from "axios";

export function FilterCountry() {
  // Find and save Country Code
  const [countryCode, setCountryCode] = useState("");

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setCountryCode(res.data.country_code);
  };

  useEffect(() => {
    getData();
  }, []);

  return !(countryCode in EXCLUDED_COUNTRIES);
}
