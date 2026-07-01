import Header from "@/Components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Create({ user }) {

    const [leaveTypes, setLeaveTypes] = useState([]);
    const [leaveTypeId, setLeaveTypeId] = useState('');
    const [applicationDate, setApplicationDate] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        axios
            .get('/leave-types')
            .then((response) => {
                setLeaveTypes(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const submitApplication = () => {

        axios
            .post('/leave-applications', {
                leave_type_id: leaveTypeId,
                application_date: applicationDate,
                reason: reason,
            })
            .then((response) => {

                window.location.href =
                    '/attendance/leave';

            })
            .catch((error) => {
                console.error(error);
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
                            {user.employee_no}
                        </td>
                    </tr>

                    <tr>
                        <th>
                            氏名
                        </th>
                        <td>
                            {user.name}
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
                                    setLeaveTypeId(e.target.value)
                                }
                            >

                                <option value="">
                                    選択してください
                                </option>

                                {leaveTypes.map((type) => (
                                    <option
                                        key={type.id}
                                        value={type.id}
                                    >
                                        {type.name}
                                    </option>
                                ))}

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
                                    setApplicationDate(e.target.value)
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
                                    setReason(e.target.value)
                                }
                            />

                        </td>
                    </tr>

                </tbody>

            </table>

            <div className="leave-button-area">

                <button
                    className="leave-submit-button"
                    onClick={submitApplication}
                >
                    申請する
                </button>

            </div>

        </div>
    );
}