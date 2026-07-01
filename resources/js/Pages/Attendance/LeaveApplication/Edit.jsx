import Header from "@/Components/Header";
import { useState } from "react";
import axios from "axios";

export default function Edit({
    leaveApplication,
    leaveTypes
}) {

    const [leaveTypeId, setLeaveTypeId] =
        useState(
            leaveApplication.leave_type_id
        );

    const [applicationDate, setApplicationDate] =
        useState(
            leaveApplication.application_date.substring(0, 10)
        );

    const [reason, setReason] =
        useState(
            leaveApplication.reason ?? ''
        );

    const updateApplication = () => {
        axios
            .put(
                `/attendance/leave/approval/${leaveApplication.id}`,
                {
                    leave_type_id: leaveTypeId,
                    application_date: applicationDate,
                    reason: reason,
                }
            )
            .then(() => {
                alert('更新しました');
                window.location.href =
                    '/attendance/leave/approval';
            });
    };

    const rejectApplication = () => {
        axios
            .post(
                `/leave-applications/${leaveApplication.id}/reject`
            )
            .then(() => {
                alert('差し戻しました');
                window.location.href =
                    '/attendance/leave/approval';
            });
    };

    const approveApplication = () => {
        axios
            .post(
                `/leave-applications/${leaveApplication.id}/approve`
            )
            .then(() => {
                alert('承認しました');
                window.location.href =
                    '/attendance/leave/approval';
            });
    };

    return (

        <div className="leave-application-container">

            <Header />

            <table className="leave-application-table">

                <tbody>

                    <tr>
                        <th>
                            社員番号
                        </th>

                        <td>
                            {leaveApplication.user.employee_no}
                        </td>
                    </tr>

                    <tr>
                        <th>
                            氏名
                        </th>

                        <td>
                            {leaveApplication.user.name}
                        </td>
                    </tr>

                    <tr>
                        <th>
                            申請区分
                        </th>

                        <td>

                            <select
                                className="leave-input"
                                value={leaveTypeId}
                                onChange={(e) =>
                                    setLeaveTypeId(
                                        e.target.value
                                    )
                                }
                            >

                                {
                                    leaveTypes.map((type) => (

                                        <option
                                            key={type.id}
                                            value={type.id}
                                        >
                                            {type.name}
                                        </option>

                                    ))
                                }

                            </select>

                        </td>

                    </tr>

                    <tr>

                        <th>
                            対象日
                        </th>

                        <td>

                            <input
                                className="leave-input"
                                type="date"
                                value={applicationDate}
                                onChange={(e) =>
                                    setApplicationDate(
                                        e.target.value
                                    )
                                }
                            />

                        </td>

                    </tr>

                    <tr>

                        <th>
                            理由
                        </th>

                        <td>

                            <textarea
                                className="leave-textarea"
                                value={reason}
                                onChange={(e) =>
                                    setReason(
                                        e.target.value
                                    )
                                }
                            />

                        </td>

                    </tr>

                </tbody>

            </table>

            <div className="leave-button-area">

                <button
                    className="back-button"
                    onClick={() => {
                        window.location.href =
                            '/attendance/leave/approval';
                    }}
                >
                    承認画面へ戻る
                </button>

                <button
                    className="save-button"
                    onClick={updateApplication}
                >
                    登録する
                </button>

                <button
                    className="reject-button"
                    onClick={rejectApplication}
                >
                    差し戻す
                </button>

                <button
                    className="approve-button"
                    onClick={approveApplication}
                >
                    承認する
                </button>

            </div>

        </div>

    );

}