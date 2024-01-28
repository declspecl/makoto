import { CalendarIcon, GanttChartIcon, SettingsIcon } from "lucide-react";
import { Button } from "./ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";

interface SidebarProps {

}

export function Sidebar({}: SidebarProps) {
    return (
        <div className="w-60">
            <Tabs defaultValue="calendar">
                <TabsList>
                    <TabsTrigger value="calendar" asChild>
                        <Button variant="secondary" size="icon">
                            <CalendarIcon />
                        </Button>
                    </TabsTrigger>

                    <TabsTrigger value="partition" asChild>
                        <Button variant="secondary" size="icon">
                            <GanttChartIcon />
                        </Button>
                    </TabsTrigger>

                    <TabsTrigger value="settings" asChild>
                        <Button variant="secondary" size="icon">
                            <SettingsIcon />
                        </Button>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="calendar">
                    <h1>Calendars</h1>

                    <ul>
                        <li>Work</li>
                        <li>Hobbies</li>
                        <li>P5R</li>
                    </ul>
                </TabsContent>
            </Tabs>
        </div>
    );
}