import Header from "@/Components/Header"
import { useEffect, useState } from "react";
import axios from 'axios'


export default function Index() {

    const [attendances, setAttendances] = useState([]);
    const [targetDate, setTargetDate] = useState(
        new Date().toISOString().split('T')[0]);

    // 当日日付割り当て
    useEffect(() => {
        const today = new Date();
        const date =
            today.getFullYear() +
            '-' +
            String(today.getMonth() + 1).padStart(2, '0') +
            '-' +
            String(today.getDate()).padStart(2, '0');

        setTargetDate(date);
    }, []);

    useEffect(() => {
        if (targetDate) {
            fetchAttendances();
        }
    }, [targetDate]);

    // API
    const fetchAttendances = () => {
        axios
            .get("/attendance/approval/list", {
                params: {
                    target_date: targetDate
                }
            })
            .then((response) => {
                setAttendances(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const formatBreakTime = (attendance) => {

        if (!attendance.attendance_break) {
            return '0:00';
        }

        const start = new Date(
            attendance.attendance_break.break_start_at
        );

        const end = new Date(
            attendance.attendance_break.break_end_at
        );

        const diffMinutes =
            (end - start) / 1000 / 60;

        const hour =
            Math.floor(diffMinutes / 60);

        const minute =
            diffMinutes % 60;

        return (
            hour +
            ':' +
            String(minute).padStart(2, '0')
        );
    };

    return (
        <div>

            <Header />

            <h1>勤怠承認一覧</h1>

            <div>
                <input
                    type="date"
                    value={targetDate}
                    onChange={(e) =>
                        setTargetDate(e.target.value)
                    }
                />
            </div>


            <table>

                <thead>
                    <tr>
                        <th>日付</th>
                        <th>社員</th>
                        <th>勤務区分</th>
                        <th>打刻拠点</th>
                        <th>出勤時間</th>
                        <th>退勤時間</th>
                        <th>休憩時間</th>
                        <th>添付</th>
                        <th>交通費</th>
                        <th>詳細</th>
                    </tr>
                </thead>

                <tbody>

                    {attendances.map((user) => (

                        <tr key={user.id}>

                            <td>-</td>

                            <td>
                                {user.employee_no}
                                <br></br>
                                {user.name}
                            </td>

                            <td>
                                09:00-18:00
                            </td>

                            <td>-</td>

                            <td>
                                {user.work_setting?.standard_start_time}
                            </td>

                            <td>
                                {user.work_setting?.standard_end_time}
                            </td>

                            <td>-</td>

                            <td>-</td>

                            <td>-</td>

                            <td>
                                <button>
                                    詳細
                                </button>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}