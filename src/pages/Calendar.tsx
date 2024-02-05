import { Sidebar } from "@/components/Sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/Resizable";

export function Calendar() {
    return (
        <div className="w-full h-full">
            <ResizablePanelGroup direction="horizontal" className="w-full h-full">
                <ResizablePanel minSize={15} defaultSize={30}>
                    <Sidebar />
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel minSize={50} defaultSize={70}>
                    <div className="w-auto grid grid-cols-7 grid-flow-row">
                        <div>Cell 1</div>
                        <div>Cell 2</div>
                        <div>Cell 3</div>
                        <div>Cell 4</div>
                        <div>Cell 5</div>
                        <div>Cell 6</div>
                        <div>Cell 7</div>
                        <div>Cell 8</div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
