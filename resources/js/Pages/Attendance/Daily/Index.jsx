import Header from "@/Components/Header"
import { useEffect, useState } from "react";

export default function Index() {

    // 月
    const [month, setMonth] = useState('');

    // APIデータ
    const [data, setData] = useState([]);

    // カレンダー表示用
    const [calendar, setCalendar] = useState([]);

    // 初期月セット
    useEffect(() => {
        const now = new Date();
        const currentMonth =
            now.getFullYear() + '-' +
            String(now.getMonth() + 1).padStart(2, '0');
        setMonth(currentMonth);
    }, []);

    // 月変更時データ取得
    useEffect(() => {
        if (month !== '') {
            fetchData();
        }
    }, [month]);

    // カレンダー作成
    useEffect(() => {
        if (month !== '') {
            createCalendar();
        }
    }, [month, data]);

    // 前月翌月切替
    const changeMonth = (diff) => {
        const date = new Date(month + '-01');
        date.setMonth(date.getMonth() + diff);
        const newMonth =
            date.getFullYear() + '-' +
            String(date.getMonth() + 1).padStart(2, '0');
        setMonth(newMonth);
    };

    // カレンダーデータ生成
    const createCalendar = () => {
        // 対象月
        const date = new Date(month + '-01');
        const year = date.getFullYear();
        const monthNumber = date.getMonth();
        // 月末日取得
        const lastDay = new Date(
            year,
            monthNumber + 1,
            0
        ).getDate();

        const days = [];
        // 1日〜月末ループ
        for (let day = 1; day <= lastDay; day++) {
            // 日付作成
            const fullDate =
                year + '-' +
                String(monthNumber + 1).padStart(2, '0') +
                '-' +
                String(day).padStart(2, '0');
            // 勤怠データ検索
            const attendance = data.find(
                (item) => item.target_date == fullDate
            );

            // 曜日配列
            const weekDays = [
                '日',
                '月',
                '火',
                '水',
                '木',
                '金',
                '土'
            ];

            // 曜日取得
            const weekDay =
                weekDays[new Date(fullDate).getDay()];

            // 表示日付
            const displayDate =
                String(day).padStart(2, '0') +
                ' ' +
                weekDay;

            // 曜日番号
            const dayNumber =
                new Date(fullDate).getDay();

            // デフォ勤務区分
            let defaultWorkType = "-";

            // 土日平日判定
            if (!attendance) {

                if (
                    dayNumber === 0 ||
                    dayNumber === 6
                ) {

                    defaultWorkType = '公休';

                } else {

                    defaultWorkType = '09:00-18:00';

                }
            }

            // カレンダー配列追加
            days.push({
                date: fullDate,
                displayDate: displayDate,
                dayNumber: dayNumber,
                attendance: attendance || null,
                defaultWorkType: defaultWorkType,
            });
        }

        // state保存
        setCalendar(days);
    }

    // API通信
    const fetchData = async () => {
        const response = await fetch(
            '/attendance/daily/monthly',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document
                        .querySelector(
                            'meta[name="csrf-token"]'
                        )
                        .content,
                },
                body: JSON.stringify({
                    month: month,
                }),
            }
        );

        // json変換
        const json = await response.json();
        // state保存
        setData(json);
    };

    const applyAttendance = async (attendanceId) => {
        await fetch(
            `/attendance/daily/${attendanceId}/apply`,
            {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document
                        .querySelector(
                            'meta[name="csrf-token"]'
                        )
                        .content,
                },
            }
        );
        fetchData();
    };

    return (

        <div className="daily-container">

            <Header />

            {/* 月切替 */}
            <div className="daily-header">

                <button
                    className="month-button"
                    onClick={() => changeMonth(-1)}
                >
                    ←
                </button>

                <span className="month-text">
                    {month}
                </span>

                <button
                    className="month-button"
                    onClick={() => changeMonth(1)}
                >
                    →
                </button>

            </div>

            {/* 一覧テーブル */}
            <table className="daily-table">

                <thead>

                    <tr>
                        <th>日付</th>
                        <th>勤務区分</th>
                        <th>出勤時刻</th>
                        <th>退勤時刻</th>
                        <th>休憩時間</th>
                        <th>申請承認</th>
                    </tr>

                </thead>

                <tbody>

                    {/* 1日ずつ表示 */}
                    {calendar.map((row) => (

                        <tr
                            key={row.date}

                            className={
                                row.dayNumber === 0
                                    ? "sunday-row"
                                    : row.dayNumber === 6
                                        ? "saturday-row"
                                        : ""
                            }
                        >

                            {/* 日付 */}
                            <td className="date-cell">
                                {row.displayDate}
                                <br></br>
                                {row.attendance?.status !== '承認済' && (
                                    <button
                                        onClick={() => {
                                            window.location.href =
                                                `/attendance/daily/${row.attendance.id}/edit`;
                                        }}
                                    >
                                        ✏️
                                    </button>

                                )}
                            </td>

                            {/* 勤務区分 */}
                            <td>
                                {
                                    row.attendance?.leave_type?.name
                                    ??
                                    row.attendance?.work_type?.name
                                    ??
                                    row.defaultWorkType
                                }
                            </td>

                            {/* 出勤 */}
                            <td>
                                {
                                    row.attendance?.start_at
                                        ? row.attendance.start_at.substring(11, 16)
                                        : '-'
                                }
                            </td>

                            {/* 退勤 */}
                            <td>

                                {
                                    row.attendance?.end_at
                                        ? row.attendance.end_at.substring(11, 16)
                                        : '-'
                                }

                            </td>

                            {/* 休憩 */}
                            <td>
                                {
                                    row.attendance?.attendance_break
                                        ? (() => {

                                            const start = new Date(
                                                row.attendance.attendance_break.break_start_at
                                            );

                                            const end = new Date(
                                                row.attendance.attendance_break.break_end_at
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

                                        })()
                                        : '0:00'
                                }
                            </td>

                            {/* ステータス */}
                            <td className="status-cell">

                                {/* 未申請 */}
                                {(
                                    !row.attendance ||
                                    row.attendance?.status === '未申請'
                                ) && (

                                        <button
                                            onClick={() =>
                                                applyAttendance(
                                                    row.attendance.id
                                                )
                                            }
                                        >
                                            申請
                                        </button>
                                    )}

                                {/* 申請中 */}
                                {row.attendance?.status === '申請中' && (

                                    <button>
                                        申請取消
                                    </button>
                                )}

                                {/* 承認済 */}
                                {row.attendance?.status === '承認済' && (

                                    <span>
                                        承認済
                                    </span>
                                )}

                                {/* 差し戻し */}
                                {row.attendance?.status === '差し戻し' && (

                                    <button
                                        onClick={() =>
                                            applyAttendance(
                                                row.attendance.id
                                            )
                                        }
                                    >
                                        申請
                                    </button>
                                )}

                                {/* 月締完了 */}
                                {row.attendance?.status === '月締完了' && (

                                    <span>
                                        月締完了
                                    </span>
                                )}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}