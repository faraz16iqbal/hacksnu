import * as fs from "fs";
import path from "path";
// Read the geolocations.json file
const data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "geolocations.json"), "utf8")
);

// Helper function to calculate Haversine distance
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  lat1 = toRadians(lat1);
  lat2 = toRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Helper function to convert degrees to radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export const getDistance = async (req, res) => {
  const { c1, c2 } = req.body;

  const country1 = data.find((c) => c.name === c1);
  const country2 = data.find((c) => c.name === c2);

  if (country1 && country2) {
    const distance = haversineDistance(
      country1.latitude,
      country1.longitude,
      country2.latitude,
      country2.longitude
    );
    console.log(
      `The distance between ${country1.name} and ${country2.name} is ${distance} kilometers.`
    );
    res.json(distance);
  } else {
    console.log("Could not find one or both countries in the dataset.");
  }
};

// Example usage: Calculate distance between USA and Canada
