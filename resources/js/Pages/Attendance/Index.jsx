import Header from "@/Components/Header"
import { useEffect, useState } from "react";

export default function Index() {

    const [currentDate, setCurrentDate] = useState('');
    const [currentClock, setCurrentClock] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');
    const [position, setPosition] = useState(null);
    const [isWorking, setIsWorking] = useState(false);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [workLocationId, setWorkLocationId] = useState(null);

    useEffect(() => {
        // 日時情報
        const timer = setInterval(() => {
            const now = new Date();

            const weekDays = [
                '日',
                '月',
                '火',
                '水',
                '木',
                '金',
                '土'
            ];

            const formattedDate =
                (now.getMonth() + 1) +
                '月' +
                now.getDate() +
                '日' +
                '（' +
                weekDays[now.getDay()] +
                '）';

            const formattedClock =
                String(now.getHours()).padStart(2, '0') +
                ':' +
                String(now.getMinutes()).padStart(2, '0') +
                ':' +
                String(now.getSeconds()).padStart(2, '0');

            setCurrentDate(formattedDate);

            setCurrentClock(formattedClock);

        }, 1000);

        // 位置情報
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const prefecture =
                data.address.prefecture ||
                data.address.province ||
                '';

            const city =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                '';

            const suburb =
                data.address.suburb ||
                data.address.neighbourhood ||
                '';

            setCurrentLocation(
                '現在地: ' + prefecture + city + suburb
            );

            setPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });

            // 打刻拠点
            const fetchLocations = async () => {
                const response = await fetch('/api/locations');
                const data = await response.json();

                setLocations(data);
            }

            fetchLocations();

        });
        return () => clearInterval(timer);
    }, []);

    // 出勤処理
    const handleWorkStart = async () => {

        const response = await fetch('/attendance/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document
                    .querySelector('meta[name="csrf-token"]')
                    .content,
            },
            body: JSON.stringify({
                location_id: selectedLocation,
                latitude: position?.latitude,
                longitude: position?.longitude,
            }),
        });
        const data = await response.json();
        console.log(data);

        setWorkLocationId(selectedLocation);
        setIsWorking(true);
    }
    // 退勤処理
    const handleWorkEnd = async () => {
        const response = await fetch('/attendance/end', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document
                    .querySelector('meta[name="csrf-token"]')
                    .content,
            },
            body: JSON.stringify({
                location_id: workLocationId,
                latitude: position?.latitude,
                longitude: position?.longitude,
            })
        })
        setIsWorking(false);
    }

    return (

        <div>

            <Header />

            <div className="attendance-container">

                <p className="attendance-date">

                    {currentDate}

                </p>

                <h1 className="attendance-clock">
                    {currentClock}
                </h1>

                <select
                    value={selectedLocation}
                    onChange={(event) => setSelectedLocation(event.target.value)}
                    disabled={isWorking}
                >
                    {locations.map((location) => (
                        <option
                            key={location.id}
                            value={location.id}
                        >
                            {location.name}
                        </option>
                    ))}
                </select>

                <div className="attendance-button-area">

                    <button
                        className="attendance-button"
                        onClick={handleWorkStart}
                        disabled={isWorking}
                    >
                        出勤
                    </button>

                    <button
                        className="attendance-button"
                        onClick={handleWorkEnd}
                        disabled={!isWorking}
                    >
                        退勤
                    </button>

                </div>

                <p className="attendance-location">

                    {currentLocation}

                </p>

            </div>

        </div>
    );
}