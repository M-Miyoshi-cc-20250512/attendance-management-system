import Header from "@/Components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Index() {

    const [leaveApplications, setLeaveApplications] = useState([]);
    const [leaveTypes, setLeaveTypes] = useState([]);

    const [applicationDate, setApplicationDate] = useState('');
    const [leaveTypeId, setLeaveTypeId] = useState('');
    const [targetDate, setTargetDate] = useState('');

    useEffect(() => {

        axios
            .get('/leave-types')
            .then((response) => {

                setLeaveTypes(response.data);

            });

        fetchData();

    }, []);

    useEffect(() => {
        fetchData();
    }, [
        applicationDate,
        leaveTypeId,
        targetDate
    ]);

    const fetchData = () => {

        axios
            .get('/leave-applications/list', {
                params: {
                    application_date: applicationDate,
                    leave_type_id: leaveTypeId,
                    target_date: targetDate,
                }
            })
            .then((response) => {

                setLeaveApplications(response.data);

            })
            .catch((error) => {

                console.error(error);

            });

    };

    return (

        <div className="leave-list-container">

            <Header />

            <div className="leave-tab-area">

                <div
                    className="leave-tab active"
                >
                    申請
                </div>

                <div
                    className="leave-tab"
                    onClick={() => {
                        window.location.href =
                            '/attendance/leave/approval';
                    }}
                >
                    承認
                </div>

            </div>

            <div className="leave-list-header">

                <button
                    className="register-button"
                    onClick={() => {
                        window.location.href =
                            '/attendance/leave/create';
                    }}
                >
                    申請登録
                </button>

            </div>

            <table className="leave-list-table">

                <thead>

                    <tr>

                        <th>

                            <input
                                className="search-input"
                                type="text"
                                placeholder="申請日"
                                value={applicationDate}
                                onChange={(e) =>
                                    setApplicationDate(
                                        e.target.value
                                    )
                                }
                            />

                        </th>

                        <th>

                            <select
                                className="search-select"
                                value={leaveTypeId}
                                onChange={(e) =>
                                    setLeaveTypeId(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    全て
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

                        </th>

                        <th>

                            <input
                                className="search-input"
                                type="text"
                                placeholder="対象日"
                                value={targetDate}
                                onChange={(e) =>
                                    setTargetDate(
                                        e.target.value
                                    )
                                }
                            />

                        </th>

                        <th>
                            理由
                        </th>

                        <th>
                            ステータス
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {leaveApplications.map((item) => (

                        <tr
                            className="data-row"
                            key={item.id}
                        >

                            <td>
                                {item.created_at.substring(0, 10)}
                            </td>

                            <td>
                                {item.leave_type?.name}
                            </td>

                            <td>
                                {item.application_date.substring(0, 10)}
                            </td>

                            <td>
                                {item.reason}
                            </td>

                            <td>
                                {item.status}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}