import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface MapViewProps {
  location: string;
}

const MapView = ({ location }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!location || !mapRef.current) return;

    // Note: In production, integrate with Esri ArcGIS JavaScript API
    // For now, showing a placeholder that would be replaced with actual map
    
    // Example initialization code (commented out - requires API key):
    /*
    import Map from "@arcgis/core/Map";
    import MapView from "@arcgis/core/views/MapView";
    
    const map = new Map({
      basemap: "streets-navigation-vector"
    });

    const view = new MapView({
      container: mapRef.current,
      map: map,
      center: [-98.5795, 39.8283], // US center
      zoom: 4
    });
    */
  }, [location]);

  return (
    <Card className="border-2 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Energy Insights Map
          {location && (
            <span className="text-sm font-normal text-muted-foreground ml-2">
              - {location}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={mapRef}
          className="w-full h-96 bg-gradient-to-br from-primary-light to-secondary rounded-lg flex items-center justify-center relative overflow-hidden"
        >
          {/* Decorative map placeholder */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 text-center p-8">
            <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interactive Map View</h3>
            <p className="text-muted-foreground max-w-md">
              {location
                ? `Showing energy insights for ${location}. In production, this would display solar potential areas, energy efficiency zones, and local utility data using Esri ArcGIS API.`
                : "Enter your location in the form above to see energy insights for your area"}
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Integration ready for:</p>
              <ul className="mt-2 space-y-1">
                <li>• Solar potential mapping</li>
                <li>• Energy efficiency zones</li>
                <li>• Local utility rates</li>
                <li>• Renewable energy sources</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-primary-light rounded-lg">
          <p className="text-sm text-primary-dark">
            <strong>Note:</strong> Full Esri ArcGIS integration requires API key configuration. 
            The map will display geocoded location data, energy insights overlays, and interactive 
            markers for renewable energy opportunities in your area.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;
