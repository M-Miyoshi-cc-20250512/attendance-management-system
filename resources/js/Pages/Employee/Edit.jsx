import Header from "@/Components/Header";
import { useState } from "react";
import axios from "axios";

export default function Edit({
    user,
    workCategories
}) {

    const [employeeNo, setEmployeeNo]
        = useState(
            user.employee_no ?? ''
        );

    const [workCategoryId,
        setWorkCategoryId]
        = useState(
            user.work_category_id ?? ''
        );

    const updateUser = () => {

        axios
            .put(
                `/employee/${user.id}`,
                {
                    employee_no:
                        employeeNo,
                    work_category_id:
                        workCategoryId,
                }
            )
            .then(() => {

                alert(
                    '更新しました'
                );

                window.location.href =
                    '/employee';

            });

    };

    return (

        <div className="employee-edit-container">

            <Header />

            <div className="employee-edit-title-area">

                <h1 className="employee-edit-title">
                    社員編集
                </h1>

            </div>

            <table className="employee-edit-table">

                <tbody>

                    <tr>

                        <th>
                            社員番号
                        </th>

                        <td>

                            <input
                                className="employee-edit-input"
                                type="text"
                                value={employeeNo}
                                onChange={(e) =>
                                    setEmployeeNo(
                                        e.target.value
                                    )
                                }
                            />

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
                            メール
                        </th>

                        <td>
                            {user.email}
                        </td>

                    </tr>

                    <tr>

                        <th>
                            勤怠区分
                        </th>

                        <td>

                            <select
                                className="employee-edit-select"
                                value={workCategoryId}
                                onChange={(e) =>
                                    setWorkCategoryId(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    選択してください
                                </option>

                                {
                                    workCategories.map((item) => (

                                        <option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </option>

                                    ))
                                }

                            </select>

                        </td>

                    </tr>

                </tbody>

            </table>

            <div className="employee-edit-button-area">

                <button
                    className="employee-back-button"
                    onClick={() => {
                        window.location.href =
                            '/employee';
                    }}
                >
                    戻る
                </button>

                <button
                    className="employee-update-button"
                    onClick={updateUser}
                >
                    更新
                </button>

            </div>

        </div>

    );

}