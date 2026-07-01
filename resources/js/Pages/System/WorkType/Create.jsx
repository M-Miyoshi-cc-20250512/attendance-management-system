import Header from "@/Components/Header";
import { useState } from "react";
import axios from "axios";

export default function Create() {

    const [name, setName]
        = useState('');

    const [isVisible,
        setIsVisible]
        = useState(true);

    const [isDefault,
        setIsDefault]
        = useState(false);

    const createWorkType = () => {

        axios
            .post(
                '/system/work-type',
                {
                    name: name,
                    is_visible: isVisible,
                    is_default: isDefault,
                }
            )
            .then(() => {

                alert(
                    '登録しました'
                );

                window.location.href =
                    '/system/work-type';

            })
            .catch((error) => {

                console.error(error);

            });

    };

    return (

        <div className="employee-container">

            <Header />

            <h1 className="employee-title">
                勤務区分登録
            </h1>

            <table className="employee-edit-table">

                <tbody>

                    <tr>

                        <th>
                            勤務区分名
                        </th>

                        <td>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                            />

                        </td>

                    </tr>

                    <tr>

                        <th>
                            表示
                        </th>

                        <td>

                            <input
                                type="checkbox"
                                checked={isVisible}
                                onChange={(e) =>
                                    setIsVisible(
                                        e.target.checked
                                    )
                                }
                            />

                        </td>

                    </tr>

                    <tr>

                        <th>
                            デフォルト
                        </th>

                        <td>

                            <input
                                type="checkbox"
                                checked={isDefault}
                                onChange={(e) =>
                                    setIsDefault(
                                        e.target.checked
                                    )
                                }
                            />

                        </td>

                    </tr>

                </tbody>

            </table>

            <div
                className="employee-button-area"
            >

                <button
                    className="employee-back-button"
                    onClick={() => {

                        window.location.href =
                            '/system/work-type';

                    }}
                >
                    戻る
                </button>

                <button
                    className="employee-save-button"
                    onClick={
                        createWorkType
                    }
                >
                    登録
                </button>

            </div>

        </div>

    );
}