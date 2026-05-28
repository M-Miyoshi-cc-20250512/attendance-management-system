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

                    <div className="menu-item">

                        <BookOpen size={28} />

                        <p>シフト</p>

                    </div>

                    <div className="menu-item">

                        <CheckCheck size={28} />

                        <p>勤怠承認</p>

                    </div>

                    <div className="menu-item">

                        <FileOutput size={28} />

                        <p>届出</p>

                    </div>

                    <div className="menu-item">

                        <FileText size={28} />

                        <p>レポート</p>

                    </div>

                    <div className="menu-item">

                        <Monitor size={28} />

                        <p>システム管理</p>

                    </div>

                </div>

            </div>

        </header>

    );
}