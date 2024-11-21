import React, { useState, useEffect, useRef, FC } from "react";
import {
  GoogleMap,
  LoadScript,
  DrawingManager,
  Marker,
  Polyline,
  Libraries,
  DirectionsService,
  DirectionsRenderer,
  Polygon,
} from "@react-google-maps/api";

const ParkingPage: FC = React.memo(() => {
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const [polygons, setPolygons] = useState<google.maps.LatLngLiteral[][]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [markerClicked, setMarkerClicked] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);
  const [route, setRoute] = useState<google.maps.DirectionsResult | null>(null);
  const [drawingMode, setDrawingMode] =
    useState<google.maps.drawing.OverlayType | null>(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const geocoder = useRef<google.maps.Geocoder | null>(null);
  const [controlsVisible, setControlsVisible] = useState(true);

  let userRole = "admin"; // ADMINKA

  const toggleControls = () => {
    setControlsVisible(!controlsVisible);
  };

  const handleScriptLoad = () => {
    geocoder.current = new google.maps.Geocoder();
  };

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userCoords);
          if (mapRef.current) {
            mapRef.current.panTo(userCoords);
          }
        },
        () => {
          console.warn(
            "Геолокация отклонена пользователем или произошла ошибка."
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, []);

  const handleOverlayComplete = (
    event: google.maps.drawing.OverlayCompleteEvent
  ) => {
    if (event.type === "polygon") {
      const polygon = event.overlay as google.maps.Polygon;
      const path = polygon
        .getPath()
        .getArray()
        .map((latLng) => ({
          lat: latLng.lat(),
          lng: latLng.lng(),
        }));
      console.log("Новый полигон:", path);
      setPolygons((prev) => [...prev, path]);
    }

    if (event.type === "marker") {
      const marker = event.overlay as google.maps.Marker;
      const position = marker.getPosition();
      if (position) {
        const newMarker = { lat: position.lat(), lng: position.lng() };
        setMarkers((prev) => [...prev, newMarker]);
        console.log("Новый маркер:", newMarker);
      }
    }
  };

  const handleRoute = () => {
    if (userLocation && selectedMarker) {
      const directionsService = new google.maps.DirectionsService();
      const request: google.maps.DirectionsRequest = {
        origin: userLocation,
        destination: selectedMarker,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setRoute(result);
        }
      });
    }
  };

  const handleMarkerClick = (marker: { lat: number; lng: number }) => {
    if (deleteMode) {
      handleDelete(marker.lat, marker.lng);
    } else {
      setSelectedMarker({ lat: marker.lat, lng: marker.lng, address: "" });
      calculateDistance(marker); // Вызываем расчет расстояния при клике на маркер
      fetchAddress(marker); // Получаем адрес
    }
    setMarkerClicked(true);
  };

  const handleDelete = (lat: number, lng: number) => {
    setMarkers((prev) => prev.filter((m) => m.lat !== lat || m.lng !== lng));
  };

  const handlePolygonClick = (polygonIndex: number) => {
    if (deleteMode) {
      setPolygons((prev) => prev.filter((_, index) => index !== polygonIndex));
    }
  };

  const calculateDistance = (marker: { lat: number; lng: number }) => {
    if (userLocation) {
      const distanceService = new google.maps.DistanceMatrixService();
      const request: google.maps.DistanceMatrixRequest = {
        origins: [userLocation],
        destinations: [marker],
        travelMode: google.maps.TravelMode.DRIVING,
      };

      distanceService.getDistanceMatrix(request, (response, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK && response) {
          const distanceInMeters = response.rows[0].elements[0].distance.value;
          const distanceInKm = distanceInMeters / 1000; // Преобразуем в километры
          setDistance(distanceInKm); // Устанавливаем состояние с расстоянием
          console.log(`Расстояние: ${distanceInKm} км`);
        } else {
          console.error("Ошибка при получении расстояния");
        }
      });
    }
  };

  const fetchAddress = (marker: { lat: number; lng: number }) => {
    if (geocoder.current) {
      const { lat, lng } = marker;
      const latLng = new google.maps.LatLng(lat, lng);
      geocoder.current.geocode({ location: latLng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
          const address = results[0].formatted_address;
          setSelectedMarker((prev) => ({
            ...prev!,
            address: address || "Адрес не найден",
          }));
        } else {
          console.error("Не удалось получить адрес.");
        }
      });
    }
  };

  const mapStyles = {
    height: "90vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 42.8746,
    lng: 74.5698,
  };

  const libraries: Libraries = ["drawing"];
  const libraries2: Libraries = ["geometry"];
  const mapOptions = {
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "poi.business",
        elementType: "geometry",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ visibility: "simplified" }],
      },
    ],
  };

  return (
    <div className="App">
      <LoadScript
        googleMapsApiKey="AIzaSyAqTr-mPDOkx_bx0D6iisABXRYgQ6fvli8"
        libraries={[...libraries, ...libraries2]}
        onLoad={handleScriptLoad}
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          center={userLocation || defaultCenter}
          zoom={16}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          onClick={(e) => {
            if (deleteMode) {
              const lat = e.latLng?.lat();
              const lng = e.latLng?.lng();
              if (lat && lng) handleDelete(lat, lng);
            }
          }}
          options={mapOptions}
        >
          {route && (
            <DirectionsRenderer
              directions={route}
              options={{
                suppressMarkers: true,
              }}
            />
          )}

          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker}
              onClick={() =>
                deleteMode
                  ? handleDelete(marker.lat, marker.lng)
                  : handleMarkerClick(marker)
              }
            />
          ))}
          {polygons.map((polygon, index) => (
            <Polygon
              key={index}
              paths={polygon}
              options={{
                fillColor: "#00ff73",
                fillOpacity: 0.4,
                strokeColor: "#00cb5f",
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
              onClick={() => {
                if (deleteMode) handlePolygonClick(index);
              }}
            />
          ))}
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
            />
          )}
          {drawingMode && (
            <DrawingManager
              onOverlayComplete={handleOverlayComplete}
              drawingMode={drawingMode}
              options={{
                drawingControlOptions: {
                  position: google.maps.ControlPosition.TOP_LEFT,
                  drawingModes: [
                    google.maps.drawing.OverlayType.MARKER,
                    google.maps.drawing.OverlayType.POLYGON,
                  ],
                },
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
      {userRole === "admin" && (
        <div className="top-0 absolute bg-green-white rounded-xl">
          <button
            onClick={toggleControls}
            className="bg-gray-500 text-white px-5 py-2 rounded-xl mb-2"
          >
            {controlsVisible ? "Скрыть управление" : "Показать управление"}
          </button>

          {controlsVisible && (
            <div>
              <button
                onClick={() =>
                  setDrawingMode(google.maps.drawing.OverlayType.MARKER)
                }
                className="bg-blue-500 text-white px-5 py-2 rounded-xl mr-2"
              >
                Добавить маркер
              </button>

              <button
                onClick={() =>
                  setDrawingMode(google.maps.drawing.OverlayType.POLYGON)
                }
                className="bg-blue-500 text-white px-5 py-2 rounded-xl mr-2"
              >
                Добавить полигон
              </button>

              <button
                onClick={() => setDeleteMode(!deleteMode)}
                className="bg-red-500 text-white px-5 py-2 rounded-xl"
              >
                {deleteMode ? "Отменить удаление" : "Режим удаления"}
              </button>

              <button
                onClick={() => setDrawingMode(null)}
                className="bg-yellow-500 text-white px-5 py-2 rounded-xl"
              >
                Режим руки
              </button>
            </div>
          )}
        </div>
      )}

      {markerClicked && (
        <div className="text-green-white rounded-2xl absolute bottom-24 bg-white max-w-md left-0 right-0 mx-auto mt-4 text-center pb-4 !shadow-[1px_1px_20px_rgba(0,0,0,0.3)] hover:!shadow-[1px_1px_10px_rgba(0,0,0,0.3)]">
          {selectedMarker && selectedMarker.address && (
            <div className="mt-2 text-center font-semibold">
              Address: {selectedMarker.address}
            </div>
          )}
          {distance !== null && (
            <div className="mt-2 text-center text-green-white font-semibold flex justify-center items-center">
              Distance:{" "}
              <svg
                width="11"
                height="13"
                viewBox="0 0 11 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ms-3 me-1 "
              >
                <path
                  d="M2.2 9.4C2.35913 9.35359 2.53018 9.37229 2.67552 9.45199C2.82086 9.5317 2.92859 9.66587 2.975 9.825C3.02141 9.98413 3.00271 10.1552 2.92301 10.3005C2.8433 10.4459 2.70913 10.5536 2.55 10.6C2.2375 10.6912 2.0125 10.7875 1.86813 10.875C2.01688 10.9644 2.25187 11.0644 2.57812 11.1575C3.3 11.3637 4.33313 11.5 5.5 11.5C6.66687 11.5 7.7 11.3637 8.42187 11.1575C8.74875 11.0644 8.98313 10.9644 9.13188 10.875C8.98813 10.7875 8.76313 10.6912 8.45063 10.6C8.294 10.5515 8.16269 10.4435 8.08499 10.2991C8.00729 10.1547 7.98944 9.98562 8.03527 9.82821C8.0811 9.6708 8.18694 9.53769 8.33 9.45759C8.47305 9.37749 8.64184 9.35681 8.8 9.4C9.2175 9.52187 9.6 9.67813 9.89375 9.87875C10.1656 10.0656 10.5 10.3912 10.5 10.875C10.5 11.3644 10.1575 11.6925 9.88125 11.8794C9.5825 12.0806 9.19188 12.2375 8.765 12.3594C7.90375 12.6062 6.75 12.75 5.5 12.75C4.25 12.75 3.09625 12.6062 2.235 12.3594C1.80813 12.2375 1.4175 12.0806 1.11875 11.8794C0.8425 11.6919 0.5 11.3644 0.5 10.875C0.5 10.3912 0.834375 10.0656 1.10625 9.87875C1.4 9.67813 1.7825 9.52187 2.2 9.4ZM5.5 0.25C6.7432 0.25 7.93549 0.74386 8.81456 1.62294C9.69364 2.50201 10.1875 3.6943 10.1875 4.9375C10.1875 6.5425 9.3125 7.8475 8.40625 8.775C8.046 9.13996 7.65887 9.47736 7.24813 9.78437C6.87687 10.0631 6.02813 10.5856 6.02813 10.5856C5.86715 10.6771 5.68516 10.7252 5.5 10.7252C5.31484 10.7252 5.13285 10.6771 4.97187 10.5856C4.55066 10.3414 4.14336 10.0739 3.75187 9.78437C3.34052 9.47811 2.95334 9.14066 2.59375 8.775C1.6875 7.8475 0.8125 6.5425 0.8125 4.9375C0.8125 3.6943 1.30636 2.50201 2.18544 1.62294C3.06451 0.74386 4.2568 0.25 5.5 0.25ZM5.5 3.6875C5.16848 3.6875 4.85054 3.8192 4.61612 4.05362C4.3817 4.28804 4.25 4.60598 4.25 4.9375C4.25 5.26902 4.3817 5.58696 4.61612 5.82138C4.85054 6.0558 5.16848 6.1875 5.5 6.1875C5.83152 6.1875 6.14946 6.0558 6.38388 5.82138C6.6183 5.58696 6.75 5.26902 6.75 4.9375C6.75 4.60598 6.6183 4.28804 6.38388 4.05362C6.14946 3.8192 5.83152 3.6875 5.5 3.6875Z"
                  fill="#159559"
                />
              </svg>
              {distance} км
              <span className="ms-1"> 100 som/hour</span>
            </div>
          )}

          <div className="flex items-center mx-auto justify-center gap-6">
            <button
              onClick={handleRoute}
              className="bg-green-500 text-white font-semibold px-5 py-2 rounded-xl mt-4 bg-green-white"
            >
              Build a route
            </button>
            <button className="bg-green-500 text-white font-semibold px-12 py-2 rounded-xl mt-4 bg-green-white">
              Book
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default ParkingPage;
