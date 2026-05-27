export default function Edit({ attendance }) {

    return (

        <div>

            <h1>
                日次勤怠編集
            </h1>

            <p>
                ID：{attendance.id}
            </p>

            <p>
                日付：{attendance.target_date}
            </p>

            <p>
                勤務区分：
                {attendance.work_type?.name}
            </p>

            <p>
                出勤：
                {attendance.start_at}
            </p>

            <p>
                退勤：
                {attendance.end_at}
            </p>

            <p>
                ステータス：
                {attendance.status}
            </p>

        </div>

    );
}