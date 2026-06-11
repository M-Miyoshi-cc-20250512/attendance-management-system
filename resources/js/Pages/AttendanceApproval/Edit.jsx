import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";

export default function Edit({
    attendance,
    workTypes,
    locations
}) {

    const [form, setForm] = useState({
        work_type_id: attendance.work_type_id,
        location_id: attendance.location_id ?? '',
        start_at: attendance.start_at?.substring(11, 16) ?? '',
        end_at: attendance.end_at?.substring(11, 16) ?? '',
        break_start: '',
        break_end: '',
        transportation_cost:
            attendance.transportation_cost ?? '',
        remarks:
            attendance.remarks ?? '',
    });

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

    if (breakMinutes > 0) {

        const middleMinutes =
            startMinute +
            Math.floor(workMinutes / 2);

        const breakStartMinutes =
            middleMinutes -
            Math.floor(breakMinutes / 2);

        const breakEndMinutes =
            breakStartMinutes +
            breakMinutes;

        const formatTime = (minutes) => {

            const hour =
                String(
                    Math.floor(minutes / 60)
                ).padStart(2, '0');

            const minute =
                String(
                    minutes % 60
                ).padStart(2, '0');

            return hour + ':' + minute;
        };

        breakStart =
            formatTime(breakStartMinutes);

        breakEnd =
            formatTime(breakEndMinutes);
    }

    useEffect(() => {

        if (breakStart && breakEnd) {

            setForm((prev) => ({
                ...prev,
                break_start: breakStart,
                break_end: breakEnd,
            }));
        }

    }, [breakStart, breakEnd]);

    const submit = () => {

        router.put(
            `/attendance/approval/${attendance.id}`,
            form
        );
    };

    const approveAttendance = async () => {

        try {
            await axios.post(
                `/attendance/approval/${attendance.id}/approve`
            );

            router.get('/attendance/approval');

        } catch (error) {
            console.error(error);
        }
    };

    const rejectAttendance = async () => {

        try {
            await axios.post(
                `/attendance/approval/${attendance.id}/reject`
            );

            router.get('/attendance/approval');

        } catch (error) {
            console.error(error);

        }
    };

    return (

        <div className="attendance-edit">

            <div className="attendance-edit__header">

                <h1 className="attendance-edit__title">
                    勤怠承認
                </h1>

                <button
                    className="attendance-edit__back-button"
                    onClick={() =>
                        router.get('/attendance/approval')
                    }
                >
                    戻る
                </button>

            </div>

            <div className="attendance-edit__actions">

                <button
                    className="attendance-edit__button"
                    onClick={submit}
                >
                    登録する
                </button>

                <button
                    className="attendance-edit__button"
                    onClick={approveAttendance}
                    disabled={
                        attendance.status === '承認済'
                        ||
                        attendance.status === '差し戻し'
                    }
                >
                    承認
                </button>

                <button
                    className="attendance-edit__button"
                    onClick={rejectAttendance}
                    disabled={
                        attendance.status === '差し戻し'
                    }
                >
                    差し戻し
                </button>

            </div>

            <div className="attendance-edit__table">

                <div className="attendance-edit__row">
                    <div className="attendance-edit__label">
                        日付
                    </div>
                    <div className="attendance-edit__value">
                        {attendance.target_date}
                    </div>
                </div>

                <div className="attendance-edit__row">
                    <div className="attendance-edit__label">
                        勤務区分
                    </div>
                    <div className="attendance-edit__value">

                        <select
                            value={form.work_type_id}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    work_type_id:
                                        e.target.value
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
                </div>

                <div className="attendance-edit__row">
                    <div className="attendance-edit__label">
                        打刻拠点
                    </div>
                    <div className="attendance-edit__value">

                        <select
                            value={form.location_id}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    location_id:
                                        e.target.value
                                })
                            }
                        >

                            <option value="">
                                選択してください
                            </option>

                            {locations.map((location) => (

                                <option
                                    key={location.id}
                                    value={location.id}
                                >
                                    {location.name}
                                </option>

                            ))}

                        </select>

                    </div>
                </div>

                <div className="attendance-edit__row">
                    <div className="attendance-edit__label">
                        出勤時刻
                    </div>
                    <div className="attendance-edit__value">

                        <input
                            type="time"
                            value={form.start_at}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    start_at:
                                        e.target.value
                                })
                            }
                        />

                    </div>
                </div>

                <div className="attendance-edit__row">
                    <div className="attendance-edit__label">
                        退勤時刻
                    </div>
                    <div className="attendance-edit__value">

                        <input
                            type="time"
                            value={form.end_at}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    end_at:
                                        e.target.value
                                })
                            }
                        />

                    </div>
                </div>

                <div className="attendance-edit__row">
                    <div className="attendance-edit__label">
                        休憩開始
                    </div>
                    <div className="attendance-edit__value">

                        <input
                            type="time"
                            value={form.break_start}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    break_start:
                                        e.target.value
                                })
                            }
                        />

                    </div>
                </div>

                <div className="attendance-edit__row">
                    <div className="attendance-edit__label">
                        休憩終了
                    </div>
                    <div className="attendance-edit__value">

                        <input
                            type="time"
                            value={form.break_end}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    break_end:
                                        e.target.value
                                })
                            }
                        />

                    </div>
                </div>

                <div className="attendance-edit__row">
                    <div className="attendance-edit__label">
                        交通費
                    </div>
                    <div className="attendance-edit__value">

                        <input
                            type="number"
                            value={form.transportation_cost}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    transportation_cost:
                                        e.target.value
                                })
                            }
                        />

                        円

                    </div>
                </div>

                <div className="attendance-edit__row">
                    <div className="attendance-edit__label">
                        備考
                    </div>
                    <div className="attendance-edit__value">

                        <textarea
                            value={form.remarks}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    remarks:
                                        e.target.value
                                })
                            }
                        />

                    </div>
                </div>

                <div className="attendance-edit__row">
                    <div className="attendance-edit__label">
                        ステータス
                    </div>
                    <div className="attendance-edit__value">
                        {attendance.status}
                    </div>
                </div>

            </div>

        </div >
    );
}