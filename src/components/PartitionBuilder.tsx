import { CalendarRangeIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import { Button } from "./ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Calendar } from "./ui/Calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export function PartitionBuilder() {
    const [rawPartitionDateRange, setRawPartitionDateRange] = useState<DateRange | undefined>();

    return (
        <Tabs defaultValue="raw" className="w-[420px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="raw">Raw Partition</TabsTrigger>
                <TabsTrigger value="rule">Partition Rule</TabsTrigger>
            </TabsList>

            <TabsContent value="raw">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Raw Partition</CardTitle>
                        <CardDescription>Add a single-use partition for a fixed time range</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Calendar
                            mode="range"
                            selected={rawPartitionDateRange}
                            onSelect={setRawPartitionDateRange}
                            className="rounded-md border"
                        />
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="rule">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Partition rule</CardTitle>
                        <CardDescription>adds a</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button>add rule</Button>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
