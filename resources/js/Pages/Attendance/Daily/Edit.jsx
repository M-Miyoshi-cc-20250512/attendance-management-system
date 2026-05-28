import { useState, useEffect } from "react";

export default function Edit({ attendance, workTypes }) {

    const [form, setForm] = useState({
        work_type_id: attendance.work_type_id,
        location_id: attendance.location_id ?? '',
        start_at: attendance.start_at?.substring(11, 16) ?? '',
        end_at: attendance.end_at?.substring(11, 16) ?? '',
        break_start: '',
        break_end: '',
        remarks: attendance.remarks ?? '',
    });

    // 時間計算
    const startMinute =
        form.start_at
            ? Number(form.start_at.substring(0, 2)) * 60 +
            Number(form.start_at.substring(3, 5))
            : 0;

    const endMinute =
        form.end_at
            ? Number(form.end_at.substring(0, 2)) * 60 +
            Number(form.end_at.substring(3, 5))
            : 0;

    const workMinutes =
        endMinute - startMinute;

    let breakMinutes = 0;
    if (workMinutes >= 480) {
        breakMinutes = 60;
    } else if (workMinutes >= 360) {
        breakMinutes = 45;
    }

    let breakStart = '';
    let breakEnd = '';

    useEffect(() => {
        if (breakStart && breakEnd){
            setForm((prev) => ({
                ...prev,
                break_start: breakStart,
                break_end: breakEnd,
            }));
        }
    },[breakStart, breakEnd]);
    
    if (breakMinutes > 0) {
        // 勤務時間の真ん中
        const middleMinutes =
            startMinute +
            Math.floor(workMinutes / 2);
        // 休憩開始
        const breakStartMinutes =
            middleMinutes -
            Math.floor(breakMinutes / 2);
        // 休憩終了
        const breakEndMinutes =
            breakStartMinutes +
            breakMinutes;

        const formatTime = (minutes) => {
            const hour =
                String(
                    Math.floor(minutes / 60)
                ).padStart(2, '0');

            return hour + ':' + minutes;
        };

        breakStart =
            formatTime(breakStartMinutes);
        breakEnd =
            formatTime(breakEndMinutes);
    }



    console.log(workTypes);

    return (

        <div>

            <h1>
                日次勤怠編集
            </h1>

            <p>
                ID：{attendance.id}
            </p>

            <p>
                日付：{attendance.target_date}
            </p>

            <div>
                <label>
                    勤務区分
                </label>
                <select
                    value={form.work_type_id}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            work_type_id: e.target.value
                        })
                    }
                >
                    {workTypes.map((workType) => (

                        <option
                            key={workType.id}
                            value={workType.id}
                        >
                            {workType.name}
                        </option>
                    ))}

                </select>
            </div>

            <div>

                <label>
                    出勤時刻
                </label>

                <input
                    type="time"
                    value={form.start_at}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            start_at: e.target.value
                        })
                    }
                />

            </div>

            <div>

                <label>
                    退勤時刻
                </label>

                <input
                    type="time"
                    value={form.end_at}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            end_at: e.target.value
                        })
                    }
                />

            </div>

            <p>
                ステータス：
                {attendance.status}
            </p>

        </div>

    );
}