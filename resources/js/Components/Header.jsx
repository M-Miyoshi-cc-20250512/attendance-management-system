import {
    Clock3,
    CalendarDays,
    BookOpen,
    CheckCheck,
    FileOutput,
    FileText,
    Monitor
} from "lucide-react";

export default function Header() {

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

                    <div className="menu-item">

                        <Clock3 size={28} />

                        <p>打刻</p>

                    </div>

                    <div className="menu-item">

                        <CalendarDays size={28} />

                        <p>日次勤怠</p>

                    </div>

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