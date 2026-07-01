import Header from "@/Components/Header";


export default function Index({
    users
}) {

    return (

        <div className="employee-container">

            <Header />

            <div className="employee-title-area">

                <h1 className="employee-title">
                    社員管理
                </h1>

            </div>

            <table className="employee-table">

                <thead>

                    <tr>

                        <th>
                            社員番号
                        </th>

                        <th>
                            氏名
                        </th>

                        <th>
                            メールアドレス
                        </th>

                        <th>
                            勤怠区分
                        </th>

                        <th>
                            編集
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        users.map((user) => (

                            <tr
                                className="employee-row"
                                key={user.id}
                            >

                                <td>
                                    {
                                        user.employee_no
                                        ?? '未設定'
                                    }
                                </td>

                                <td>
                                    {user.name}
                                </td>

                                <td>
                                    {user.email}
                                </td>

                                <td>
                                    {
                                        user.work_category?.name
                                        ?? '未設定'
                                    }
                                </td>

                                <td>

                                    <button
                                        className="employee-edit-button"
                                        onClick={() => {

                                            window.location.href =
                                                `/employee/${user.id}/edit`;

                                        }}
                                    >
                                        編集
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}