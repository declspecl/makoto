import { CalendarRangeIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import { Button } from "./ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Calendar } from "./ui/Calendar";

export function PartitionBuilder() {
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
                        <CardDescription></CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Calendar
                            mode="range"
                            className="rounded-container-md border"
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
