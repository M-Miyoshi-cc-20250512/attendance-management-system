import Header from "@/Components/Header"
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import axios from 'axios'


export default function Index() {

    const [attendances, setAttendances] = useState([]);
    const [targetDate, setTargetDate] = useState(
        new Date().toISOString().split('T')[0]);
    const [employeeNo, setEmployeeNo] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');

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
    }, [
        targetDate,
        employeeNo,
        employeeName,
        location,
        status
    ]);

    // API
    const fetchAttendances = () => {
        axios
            .get("/attendance/approval/list", {
                params: {
                    target_date: targetDate,
                    employee_no: employeeNo,
                    employee_name: employeeName,
                    location: location,
                    status: status
                }
            })
            .then((response) => {
                setAttendances(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const approveAttendance = async (attendanceId) => {
        try {
            await axios.post(
                `/attendance/approval/${attendanceId}/approve`
            );
            fetchAttendances();
        } catch (error) {
            console.error(error);
        }
    };

    const rejectAttendance = async (attendanceId) => {
        try {
            await axios.post(
                `/attendance/approval/${attendanceId}/reject`
            );
            fetchAttendances();
        } catch (error) {
            console.error(error);
        }
    }

    const formatBreakTime = (attendance) => {

        if (!attendance) {
            return '0:00';
        }

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

    const approveAllAttendances = async () => {

        try {

            await axios.post(
                '/attendance/approval/approve-all',
                {
                    target_date: targetDate,
                    employee_no: employeeNo,
                    employee_name: employeeName,
                    location: location,
                    status: status
                }
            );

            fetchAttendances();

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <div>

            <Header />

            <div className="approval-header">

                <input
                    type="date"
                    value={targetDate}
                    onChange={(e) =>
                        setTargetDate(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="社員番号"
                    value={employeeNo}
                    onChange={(e) =>
                        setEmployeeNo(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="氏名"
                    value={employeeName}
                    onChange={(e) =>
                        setEmployeeName(e.target.value)
                    }
                />

                <select
                    value={location}
                    onChange={(e) =>
                        setLocation(e.target.value)
                    }
                >
                    <option value="">
                        打刻拠点
                    </option>

                    <option value="SES">
                        SES
                    </option>

                    <option value="社内業務">
                        社内業務
                    </option>
                </select>

                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                >
                    <option value="">
                        申請状況
                    </option>

                    <option value="申請中">
                        申請中
                    </option>

                    <option value="承認済">
                        承認済
                    </option>

                    <option value="差し戻し">
                        差し戻し
                    </option>
                </select>

                <button
                    className="approve-button"
                    onClick={approveAllAttendances}
                >
                    一括承認
                </button>

            </div>


            <table className="approval-table">

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
                        <th className="remarks-column">
                            備考
                        </th>
                        <th>申請承認</th>
                    </tr>
                </thead>

                <tbody>

                    {attendances.map((user) => {

                        const attendance =
                            user.attendance_daily?.[0];

                        return (
                            <tr key={user.id}>

                                <td>
                                    {targetDate}

                                    {
                                        attendance && (
                                            <div>
                                                <button
                                                    onClick={() =>
                                                        router.get(
                                                            `/attendance/approval/${attendance.id}/edit`
                                                        )
                                                    }
                                                >
                                                    ✏️
                                                </button>
                                            </div>
                                        )
                                    }
                                </td>

                                <td>
                                    {user.employee_no}
                                    <br></br>
                                    {user.name}
                                </td>

                                <td>
                                    {
                                        user.work_setting?.standard_start_time?.substring(0, 5)
                                        +
                                        '-'
                                        +
                                        user.work_setting?.standard_end_time?.substring(0, 5)
                                    }
                                </td>

                                <td>
                                    {
                                        attendance?.location?.name
                                        ?? '-'
                                    }
                                </td>

                                <td>
                                    {
                                        attendance?.start_at
                                            ? attendance.start_at.substring(11, 16)
                                            : '-'
                                    }
                                </td>

                                <td>
                                    {
                                        attendance?.end_at
                                            ? attendance.end_at.substring(11, 16)
                                            : '-'
                                    }
                                </td>

                                <td>
                                    {formatBreakTime(attendance)}
                                </td>

                                <td>-</td>

                                <td>
                                    {
                                        attendance?.transportation_cost != null
                                            ? `¥${attendance.transportation_cost}`
                                            : '-'
                                    }
                                </td>


                                <td className="remarks-column">
                                    {
                                        attendance?.remarks
                                        ?? '-'
                                    }
                                </td>

                                <td>

                                    {
                                        !attendance && (
                                            <span>
                                                申請待ち
                                            </span>
                                        )
                                    }

                                    {
                                        attendance?.status === '未申請' && (
                                            <span>
                                                申請待ち
                                            </span>
                                        )
                                    }

                                    {
                                        attendance?.status === '申請中' && (
                                            <button
                                                className="approve-button"
                                                onClick={() =>
                                                    approveAttendance(
                                                        attendance.id
                                                    )
                                                }
                                            >
                                                承認
                                            </button>
                                        )
                                    }

                                    {
                                        attendance?.status === '承認済' && (
                                            <button
                                                className="reject-button"
                                                onClick={() =>
                                                    rejectAttendance(attendance.id)
                                                }
                                            >
                                                差し戻し
                                            </button>
                                        )
                                    }

                                    {
                                        attendance?.status === '差し戻し' && (
                                            <span>
                                                差し戻し中
                                            </span>
                                        )
                                    }

                                    {
                                        attendance?.status === '月締完了' && (
                                            <span>
                                                月締完了
                                            </span>
                                        )
                                    }

                                </td>

                            </tr>

                        );
                    })}

                </tbody>

            </table>

        </div>
    );
}