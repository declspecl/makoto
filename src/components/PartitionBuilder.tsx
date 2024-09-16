import { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Calendar } from "./ui/Calendar";
import { DateRange } from "react-day-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { getTimeFromString } from "@lib/helpers/timing";
import { RawPartition } from "@backend/partition";
import { PeriodOfTime, PointInTime } from "@backend/dayTime";
import { getMonthFromMonthIndex } from "@lib/helpers/conversions";
import { useMakotoStateDispatchContext } from "@context/MakotoStateContext";
import { useSetErrorLogContext } from "@context/ErrorLog";

export function PartitionBuilder() {
    const setErrorLog = useSetErrorLogContext();
    const setMakotoState = useMakotoStateDispatchContext();

    const [rawPartitionDateRange, setRawPartitionDateRange] = useState<DateRange | undefined>();
    const [rawPartitionStartTime, setRawPartitionStartTime] = useState<string>("00:00");
    const [rawPartitionEndTime, setRawPartitionEndTime] = useState<string>("23:59");
    const [rawPartitionTitle, setRawPartitionTitle] = useState<string | undefined>();
    const [rawPartitionDescription, setRawPartitionDescription] = useState<string | undefined>();
    const [isRawPartitionJustCreated, setIsRawPartitionJustCreated] = useState<boolean>(false);

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
                        <CardDescription>Create a single-use partition for a fixed time range</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={(e) => {
                            e.preventDefault();

                            if (!rawPartitionDateRange || !rawPartitionDateRange.from || !rawPartitionDateRange.to) {
                                console.error("invalid date range (impossible)");
                                return;
                            }

                            if (!rawPartitionTitle || !rawPartitionDescription) {
                                console.error("invalid title or description (impossible)");
                                return;
                            }

                            const startPIT: PointInTime = {
                                year: rawPartitionDateRange.from.getFullYear(),
                                month: getMonthFromMonthIndex(rawPartitionDateRange.from.getMonth()),
                                day_of_month: rawPartitionDateRange.from.getDate(),
                                time: getTimeFromString(rawPartitionStartTime)
                            };

                            const endPIT: PointInTime = {
                                year: rawPartitionDateRange.to.getFullYear(),
                                month: getMonthFromMonthIndex(rawPartitionDateRange.to.getMonth()),
                                day_of_month: rawPartitionDateRange.to.getDate(),
                                time: getTimeFromString(rawPartitionEndTime)
                            };

                            const periodOfTime: PeriodOfTime = {
                                start: startPIT,
                                end: endPIT
                            };

                            const rawPartition: RawPartition = {
                                title: rawPartitionTitle,
                                description: rawPartitionDescription,
                                period_of_time: periodOfTime,
                                tag_indices: [] // TODO
                            }

                            setMakotoState({
                                type: "addRawPartition",
                                rawPartition,
                                setErrorLog
                            });

                            setIsRawPartitionJustCreated(true);
                        }}>
                            <div>
                                <label htmlFor="partitionTitleInput">Title <span className="text-primary-200">*</span></label>
                                <Input required id="partitionTitleInput" type="text" placeholder="Raw Partition Title" value={rawPartitionTitle} onChange={(e) => setRawPartitionTitle(e.target.value)} />
                            </div>

                            <div className="h-2" />

                            <div>
                                <label htmlFor="partitionDescriptionInput">Description <span className="text-primary-200">*</span></label>
                                <Input required id="partitionDescriptionInput" type="text" placeholder="Raw partition description" value={rawPartitionDescription} onChange={(e) => setRawPartitionDescription(e.target.value)} />
                            </div>

                            <div className="h-4" />

                            <Calendar
                                mode="range"
                                selected={rawPartitionDateRange}
                                onSelect={setRawPartitionDateRange}
                                className="rounded-md border"
                            />

                            {rawPartitionDateRange && rawPartitionDateRange.from && rawPartitionDateRange.to && (
                                <div>
                                    <div className="h-2" />

                                    <div>
                                        <label htmlFor="startTimeInput">Start Time (hh:mm) <span className="text-primary-200">*</span></label>
                                        <Input
                                            required
                                            id="startTimeInput"
                                            type="time"
                                            value={rawPartitionStartTime}
                                            onChange={(e) => setRawPartitionStartTime(e.target.value)}
                                        />
                                    </div>

                                    <div className="h-2" />

                                    <div>
                                        <label htmlFor="endTimeInput">End Time (hh:mm) <span className="text-primary-200">*</span></label>
                                        <Input
                                            required
                                            id="endTimeInput"
                                            type="time"
                                            value={rawPartitionEndTime}
                                            onChange={(e) => setRawPartitionEndTime(e.target.value)}
                                        />
                                    </div>

                                    <div className="h-4" />

                                    <Button type="submit">Create Raw Partition</Button>

                                    {isRawPartitionJustCreated && (
                                        <p className="text-success">Raw partition successfully created!</p>
                                    )}
                                </div>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="rule">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Partition Rule</CardTitle>
                        <CardDescription>Create a ruleset that will activate a partition under certain conditions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button>Create Partition Rule</Button>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
