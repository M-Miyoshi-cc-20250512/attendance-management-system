import Header from "@/Components/Header"

export default function Index() {
    return (
    <div>

        <Header />

        <h1>勤怠承認一覧</h1>

        <table>

            <thead>
                <tr>
                    <th>日付</th>
                    <th>社員</th>
                    <th>勤務区分</th>
                    <th>打刻拠点</th>
                    <th>出勤時間</th>
                    <th>退勤時間</th>
                    <th>休憩時間</th>
                    <th>添付</th>
                    <th>交通費</th>
                    <th>詳細</th>
                </tr>
            </thead>

            <tbody>

            </tbody>

        </table>

    </div>
);
}