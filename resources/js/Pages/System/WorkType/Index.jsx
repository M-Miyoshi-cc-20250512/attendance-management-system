import Header from "@/Components/Header";
import axios from "axios";

export default function Index({
    workTypes
}) {

    const moveUp = (id) => {
        axios
            .post(
                `/system/work-type/${id}/up`
            )
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const moveDown = (id) => {
        axios
            .post(
                `/system/work-type/${id}/down`
            )
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (



        <div>

            <Header />



            <h1 className="employee-title">
                勤務区分管理
            </h1>

            <div className="employee-button-area">

                <button
                    className="employee-save-button"
                    onClick={() => {

                        window.location.href =
                            '/system/work-type/create';

                    }}
                >
                    新規登録
                </button>

            </div>

            <table className="employee-table">

                <thead>

                    <tr>

                        <th>
                            順番
                        </th>

                        <th>
                            勤務区分
                        </th>

                        <th>
                            表示
                        </th>

                        <th>
                            デフォルト
                        </th>

                        <th>
                            編集
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        workTypes.map((item) => (

                            <tr
                                key={item.id}
                            >

                                <td>

                                    <button
                                        className="order-button"
                                        onClick={() =>
                                            moveUp(item.id)
                                        }
                                    >
                                        ↑
                                    </button>

                                    <button
                                        className="order-button"
                                        onClick={() =>
                                            moveDown(item.id)
                                        }
                                    >
                                        ↓
                                    </button>

                                </td>

                                <td>
                                    {
                                        item.name
                                    }
                                </td>

                                <td>

                                    {
                                        item.is_visible
                                            ? '表示'
                                            : '非表示'
                                    }

                                </td>

                                <td>

                                    {
                                        item.is_default
                                            ? '○'
                                            : ''
                                    }

                                </td>

                                <td>

                                    <button
                                        className="employee-edit-button"
                                        onClick={() => {

                                            window.location.href =
                                                `/system/work-type/${item.id}/edit`;

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