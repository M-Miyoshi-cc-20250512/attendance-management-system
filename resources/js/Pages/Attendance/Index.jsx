import { useEffect, useState } from "react";

export default function Index() {

    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {

        const timer = setInterval(() => {
            const now = new Date();

            const formattedTime =
                now.getFullYear() + '/' +
                String(now.getMonth() + 1).padStart(2, '0') + '/' +
                String(now.getDate()).padStart(2, '0') + ' ' +
                String(now.getHours()).padStart(2, '0') + ':' +
                String(now.getMinutes()).padStart(2, '0') + ':' +
                String(now.getSeconds()).padStart(2, '0');

            
            setCurrentTime(formattedTime);

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    return (

        <div>

            <h1>打刻画面</h1>

            <p>{currentTime}</p>

            <button>
                出勤
            </button>

            <button>
                退勤
            </button>

        </div>
    );
}