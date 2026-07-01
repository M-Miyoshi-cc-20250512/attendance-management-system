import Header from "@/Components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Approval() {

    const [leaveApplications, setLeaveApplications] = useState([]);
    const [leaveTypes, setLeaveTypes] = useState([]);

    const [applicationDate, setApplicationDate] = useState('');
    const [employeeNo, setEmployeeNo] = useState('');
    const [name, setName] = useState('');
    const [leaveTypeId, setLeaveTypeId] = useState('');
    const [targetDate, setTargetDate] = useState('');

    const fetchData = () => {

        axios
            .get('/leave-applications/approval-list', {
                params: {
                    application_date: applicationDate,
                    employee_no: employeeNo,
                    name: name,
                    leave_type_id: leaveTypeId,
                    target_date: targetDate,
                }
            })
            .then((response) => {
                setLeaveApplications(
                    response.data
                );
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const approveApplication = (id) => {

        axios
            .post(`/leave-applications/${id}/approve`)
            .then(() => {

                fetchData();

            })
            .catch((error) => {

                console.error(error);

            });

    };

    const rejectApplication = (id) => {
        axios
            .post(`/leave-applications/${id}/reject`)
            .then(() => {
                fetchData();
            })
            .catch((error) => {
                console.error(error);
            });
    };

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
        employeeNo,
        name,
        leaveTypeId,
        targetDate
    ]);

    return (

        <div className="leave-list-container">

            <Header />

            <div className="leave-tab-area">

                <div
                    className="leave-tab"
                    onClick={() => {

                        window.location.href =
                            '/attendance/leave';

                    }}
                >
                    申請
                </div>

                <div
                    className="leave-tab active"
                >
                    承認
                </div>

            </div>

            <table className="leave-list-table">

                <thead>

                    <tr>

                        <th>

                            <input
                                type="text"
                                className="search-input"
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

                            <input
                                type="text"
                                className="search-input"
                                placeholder="社員番号"
                                value={employeeNo}
                                onChange={(e) =>
                                    setEmployeeNo(
                                        e.target.value
                                    )
                                }
                            />

                        </th>

                        <th>

                            <input
                                type="text"
                                className="search-input"
                                placeholder="氏名"
                                value={name}
                                onChange={(e) =>
                                    setName(
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

                        </th>

                        <th>

                            <input
                                type="text"
                                className="search-input"
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
                            申請承認
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        leaveApplications.map((item) => (

                            <tr
                                className="data-row"
                                key={item.id}
                                onClick={() => {
                                    window.location.href =
                                        `/attendance/leave/approval/${item.id}/edit`;
                                }}
                            >

                                <td>

                                    {
                                        item.created_at?.substring(
                                            0,
                                            10
                                        )
                                    }

                                </td>

                                <td>

                                    {
                                        item.user?.employee_no
                                    }

                                </td>

                                <td>

                                    {
                                        item.user?.name
                                    }

                                </td>

                                <td>

                                    {
                                        item.leave_type?.name
                                    }

                                </td>

                                <td>

                                    {
                                        item.application_date?.substring(
                                            0,
                                            10
                                        )
                                    }

                                </td>

                                <td>

                                    {
                                        item.reason
                                    }

                                </td>

                                <td>

                                    {
                                        item.status === '申請中' && (
                                            <>
                                                <button
                                                    className="approve-button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        approveApplication(item.id);
                                                    }}
                                                >
                                                    承認
                                                </button>

                                                <button
                                                    className="reject-button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        rejectApplication(item.id);
                                                    }}
                                                >
                                                    差し戻し
                                                </button>
                                            </>
                                        )
                                    }

                                    {
                                        item.status === '差し戻し' && (
                                            <span className="reject-status">
                                                差し戻し中
                                            </span>
                                        )
                                    }

                                    {
                                        item.status === '承認済' && (
                                            <span className="approve-status">
                                                承認済
                                            </span>
                                        )
                                    }

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}