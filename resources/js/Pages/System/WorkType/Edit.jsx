import Header from "@/Components/Header";
import { useState } from "react";
import axios from "axios";

export default function Edit({
    workType
}) {

    const [name, setName]
        = useState(
            workType.name ?? ''
        );

    const [isVisible,
        setIsVisible]
        = useState(
            workType.is_visible
        );

    const [isDefault,
        setIsDefault]
        = useState(
            workType.is_default
        );

    const [displayOrder,
        setDisplayOrder]
        = useState(
            workType.display_order
        );

    const updateWorkType = () => {

        axios
            .put(
                `/system/work-type/${workType.id}`,
                {
                    name: name,
                    is_visible: isVisible,
                    is_default: isDefault,
                    display_order: displayOrder,
                }
            )
            .then(() => {

                alert(
                    '更新しました'
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
                勤務区分編集
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

                    <tr>

                        <th>
                            表示順
                        </th>

                        <td>

                            <input
                                type="number"
                                value={displayOrder}
                                onChange={(e) =>
                                    setDisplayOrder(
                                        e.target.value
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
                        updateWorkType
                    }
                >
                    更新
                </button>

            </div>

        </div>

    );
}