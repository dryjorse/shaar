import React, { useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  StandaloneSearchBox,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

const MapPage = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [kyrgyzstanBounds, setKyrgyzstanBounds] = useState<
    google.maps.LatLngBounds | null
  >(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const center = { lat: 42.826434, lng: 74.548867 }; // Центр карты

  // Функция добавления маркера
  const addMarker = (location: { lat: number; lng: number }) => {
    setMarkers((prev) => [...prev, location]);
  };

  // Обработчик поиска
  const handleSearchPlaces = () => {
    if (!searchBoxRef.current) return;

    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const location = places[0].geometry?.location;
      if (location) {
        const newCenter = {
          lat: location.lat(),
          lng: location.lng(),
        };

        // Создание маршрута от центра до выбранной точки
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
          {
            origin: center, // Центр карты
            destination: newCenter, // Выбранная точка
            travelMode: google.maps.TravelMode.DRIVING, // Можно выбрать другие режимы, например WALKING
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              setDirections(result); // Сохраняем результат маршрута
            } else {
              console.error("Ошибка при построении маршрута:", status);
            }
          }
        );

        setMap((prev) => {
          if (prev) prev.panTo(newCenter);
          return prev;
        });
      }
    }
  };

  const handleLoad = () => {
    // Установить границы Кыргызстана после загрузки Google Maps API
    setKyrgyzstanBounds(
      new google.maps.LatLngBounds(
        { lat: 39.1726, lng: 69.2646 }, // Юго-западная точка
        { lat: 43.2645, lng: 80.2590 } // Северо-восточная точка
      )
    );
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAqTr-mPDOkx_bx0D6iisABXRYgQ6fvli8"
      libraries={["places"]}
      onLoad={handleLoad}
    >
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "90vh" }}
        center={center}
        zoom={16} // Более общий вид для страны
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        {/* Поиск с ограничением на Кыргызстан */}
        <StandaloneSearchBox
          onLoad={(ref) => (searchBoxRef.current = ref)}
          onPlacesChanged={handleSearchPlaces}
          bounds={kyrgyzstanBounds || undefined} // Ограничиваем результаты Кыргызстаном
        >
          <div>
            <input
              type="text"
              placeholder="Найти место"
              className="rounded-[40px] border-2 border-[#000] absolute top-[22px] left-[50%] translate-x-[-50%] py-[6px] px-[14px] max-w-[702px] w-full flex gap-[14px] justify-between items-center bg-[#F4F4F4] z-[50]"
            />
            <img src={"../../assets/images/icons/search.svg"} alt="search" />
          </div>
        </StandaloneSearchBox>

        {/* Маркеры */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
          />
        ))}

        {/* InfoWindow */}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h3>Место</h3>
              <p>Информация о маркере.</p>
            </div>
          </InfoWindow>
        )}

        {/* Отображение маршрута */}
        {directions && (
          <DirectionsRenderer
            directions={directions}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapPage;
