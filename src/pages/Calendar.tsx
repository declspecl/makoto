import { Sidebar } from "@/components/Sidebar";

export function Calendar() {
    return (
        <div className="flex flex-row">
            <Sidebar />

            <div>
                <h2>Content</h2>
            </div>
        </div>
    );
}