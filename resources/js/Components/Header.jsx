import {
    Clock3,
    CalendarDays,
    BookOpen,
    CheckCheck,
    FileOutput,
    FileText,
    Monitor
} from "lucide-react";

import { Link, usePage } from "@inertiajs/react";

export default function Header() {

    const { url } = usePage();

    return (

        <header className="header">

            <div className="logo">

                <img

                    src="/images/images.png"
                    alt="ロゴ"
                    className="logo-image"
                />

            </div>

            <div className="menu-wrapper">

                <div className="menu">

                    <Link href="/attendance" className={`menu-item ${url === "/attendance" ? "active" : ""}`}>
                        <Clock3 size={28} />

                        <p>打刻</p>

                    </Link>

                    <Link href="/attendance/daily" className={`menu-item ${url === "/attendance/daily" ? "active" : ""}`}>
                        <CalendarDays size={28} />

                        <p>日次勤怠</p>

                    </Link>

                    <Link href="/attendance/approval" className={`menu-item ${url === "/attendance/approval" ? "active" : ""}`}>

                        <CheckCheck size={28} />

                        <p>勤怠承認</p>

                    </Link>

                    <Link href="/attendance/leave" className={`menu-item ${url === "//attendance/leave" ? "active" : ""}`}>

                        <FileOutput size={28} />

                        <p>届出</p>

                    </Link>

                    <div className="menu-item">

                        <FileText size={28} />

                        <p>レポート</p>

                    </div>

                    <Link href="/system/work-type" className={`menu-item ${url === "/system/work-type" ? "active" : ""}`}>


                        <Monitor size={28} />

                        <p>システム管理</p>

                    </Link>

                </div>

            </div>

        </header>

    );
}