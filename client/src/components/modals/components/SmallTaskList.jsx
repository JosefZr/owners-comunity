import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { LucideCalendar, LucidePlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import * as SliderPrimitive from "@radix-ui/react-slider";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import { useCreateTask } from "@/hooks/tasks/useCreateTask";
import { useUserTasks } from "@/hooks/tasks/useGetUserTasks";
import { useLocation } from "react-router-dom";
import { useUserSimpleTasks } from "@/hooks/tasks/useGetSimpleTasks";
import AdvancedCheckList from "@/components/PlanLikePro/AdvancedCheckList";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";

const Container = styled.div`
    overscroll-behavior-block: none;
    overscroll-behavior-x: none;
    scroll-behavior: auto;
    scroll-snap-stop: always;
    scroll-snap-align: start;
    scroll-snap-type: x mandatory;

  /* Hide scrollbars completely */
  overflow: hidden; /* Prevent scrolling entirely */
`;
export const DAYS_OF_WEEK = [
    { value: "su", label: "Su" },
    { value: "mo", label: "Mo" },
    { value: "tu", label: "Tu" },
    { value: "we", label: "We" },
    { value: "th", label: "Th" },
    { value: "fr", label: "Fr" },
    { value: "sa", label: "Sa" },
];
export const REMINDER_TIMES = [
    { value: "at_time", label: "At time of task" },
    { value: "5_min", label: "5 minutes before" },
    { value: "10_min", label: "10 minutes before" },
    { value: "15_min", label: "15 minutes before" },
    { value: "30_min", label: "30 minutes before" },
    { value: "1_hour", label: "1 hour before" },
];
export default function SmallTaskList() {

    const location = useLocation(); // Get the current location
    const isActive = location.pathname.includes(`/channels`); // Check if the current path includes the id
    const [sliderValue, setSliderValue] = useState([30]);
    const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
    const [showReminder, setShowReminder] = useState(false);
    const [showRepeat, setShowRepeat] = useState(false);
    const [selectedRepeatDays, setSelectedRepeatDays] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [newTaskData, setNewTaskData] = useState({
        title: "",
        description: "",
        startDate: "",
        startTime: "",
        duration: 30,
        isRepeating: false,
        category: "",
    });
    const userInfo = jwtDecode(localStorage.getItem("token"));

    const id = userInfo.userId;
    const { data: advanced, isLoading: isGettingAdvanced, isError: isAdvancederror, error: AdvancedError } = useUserTasks({ id, category: "Advanced" });
    const { data: simple, isLoading: isGettingSimple, isError: isSimpleerror, error: SimpleError } = useUserSimpleTasks({ id, category: "Simple" });

    const mutation = useCreateTask(); // Use the custom hook

    const handleQuickAdd = (e) => {
        if (e.key === "Enter") {
            if (!newTaskData.title) {
                alert("Title is required.");
                return;
            }

            // Create a task object with the category set to "Simple"
            const taskData = { ...newTaskData, category: "Simple" };

            const id = userInfo.userId;

            console.log(taskData); // Log the correct task object with "Simple" category

            // Uncomment this to send the task to the backend
            mutation.mutate({ id, task: taskData });

            // Reset the form after task creation
            setNewTaskData({
                title: "",
                description: "",
                startDate: "",
                startTime: "",
                duration: 30,
            });
        }
    };

    const HandleAddQuickTaskTask = (e) => {
        e.preventDefault();
        if (!newTaskData.title) {
            alert("Title.");
            return;
        }
        const task = {
            ...newTaskData,
            duration: sliderValue[0],
            repeatDays: selectedRepeatDays,
            category: "Simple",
        }
        // console.log(task)
        const id = userInfo.userId
        mutation.mutate({ id, task });
        // console.log(newTask)
        setNewTaskData({
            title: "",
            description: "",
            startDate: "",
            startTime: "",
            duration: 30,
            category: "", // Reset to default
        });
    }

    const handleTaskInputChange = (field, value) => {
        if (field === "startDate" && value instanceof Date) {
            const adjustedDate = new Date(value.getTime() - (value.getTimezoneOffset() * 60000));
            value = adjustedDate.toISOString().split('T')[0];
        }
        setNewTaskData((prev) => ({ ...prev, [field]: value }));
    };
    const isTaskValid = () => {
        if (!newTaskData.title || !newTaskData.startDate || !newTaskData.startTime) {
            alert("Title, date, and time are required.");
            return false;
        }
        return true;
    };
    const HandleAddTask = () => {
        if (!isTaskValid()) return;
        // Task and User ID to send to the backend
        const id = userInfo.userId
        const task = {
            ...newTaskData,
            duration: sliderValue[0],
            repeatDays: selectedRepeatDays,
            category: "Advanced",
        };
        console.log(task);
        // Remove 'hasCustomEnd' and 'hasReminder' if they are not needed
        // Trigger the mutation
        console.log("Sending payload:", { id, task });

        mutation.mutate({ id, task });

        // Resetting the form state
        setIsNewTaskOpen(false);
        setNewTaskData({
            title: '',
            description: '',
            startDate: '',
            startTime: '',
            duration: 30,
            hasCustomEnd: false,
            hasReminder: false,
            isRepeating: false,
            category: '',
        });
        setSelectedRepeatDays([]);
        setShowDatePicker(false);
    };

    const handleRepeatDaySelection = (day) => {
        setSelectedRepeatDays((prevSelectedDays) => {
            if (prevSelectedDays.includes(day)) {
                return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
            } else {
                return [...prevSelectedDays, day];
            }
        });
    };
    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };
    return (
        <Container className=" mx-2 mt-1 flex h-auto flex-col overflow-hidden  ">

            <div className={`col-span-3 row-span-1 flex items-center justify-stretch gap-2 p-1  rounded-lg border-[1px]  border-[#365169] border-solid ${isActive && "w-full"} w-[400px] max-sm:w-full`}>
                <div className="relative z-20 w-full h-full">
                    <input
                        className="outline-none focus:outline-none border-none focus:border-none focus:bg-transparent rounded-none h-full w-full bg-transparent pl-3 text-xl placeholder:text-white/45"
                        placeholder="Describe your task"
                        value={newTaskData.title}
                        onChange={(e) => handleTaskInputChange("title", e.target.value)}
                        onKeyDown={handleQuickAdd}
                    />
                    <button
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        onClick={() => setIsNewTaskOpen(true)}
                    >
                        <LucideCalendar className="w-5 h-5" />
                    </button>
                </div>
                <button
                    className=" rounded-md bg-gradient-to-r from-my-from to-my-to hover:bg-my-gold hover:opacity-90 text-center flex justify-center items-center h-14 w-14"
                    onClick={HandleAddQuickTaskTask}
                >
                    <LucidePlus className=" text-black " />
                </button>
            </div>
            <AdvancedCheckList title={"Advanced Checklist"} tasks={simple || []} isLoading={isGettingSimple} />
            <AdvancedCheckList title={"Upcoming Events"} tasks={advanced || []} isLoading={isGettingAdvanced} />

            <Drawer className="z-[200]" open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen}>
                <DrawerContent className=" text-white border-gray-800 md:max-w-[800px] mx-auto h-[80%]  bg-gradient-to-br from-[#353F47] to-[rgba(6,14,21,0)]" style={{
                    backgroundColor: "rgb(6 14 21/1)",
                }}>
                    <img
                        src="/ai/carbon_bg.webp"
                        alt="carbon fiber bg"
                        width="1736"
                        height="943"
                        loading="lazy"
                        className="max-h-[100%] h-[100%] opacity-[2%] w-full object-cover top-0 left-0 pointer-events-none"
                        style={{ position: "absolute" }}
                    />
                    <DrawerHeader>
                        <DialogTitle>New Task</DialogTitle>
                    </DrawerHeader>
                    <div className="flex-1 overflow-y-auto p-4">
                        <Input
                            placeholder="Task name"
                            className=" bg-deep-blue input input-sm task-edit-title-input w-full mb-2 px-6 py-7 border-none"
                            value={newTaskData.title}
                            onChange={(e) => handleTaskInputChange("title", e.target.value)}
                        />
                        <Textarea
                            placeholder="Describe your task..."
                            className="bg-deep-blue input input-sm w-full px-6 mb-5 py-4 border-none"
                            value={newTaskData.description}
                            onChange={(e) => handleTaskInputChange("description", e.target.value)}
                        />
                        <div className="space-y-4">
                            <div>
                                <Label>Start</Label>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            className="bg-deep-blue border-none pr-10 h-10 rounded-none"
                                            value={newTaskData.startDate}
                                            placeholder="Select date"
                                            readOnly
                                        />
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                                            onClick={toggleDatePicker}
                                        >
                                            <LucideCalendar className="w-5 h-5" />
                                        </Button>
                                    </div>
                                    <Input
                                        type="time"
                                        className="bg-deep-blue border-none text-white h-10 rounded-none"
                                        value={newTaskData.startTime}
                                        onChange={(e) => handleTaskInputChange("startTime", e.target.value)}
                                    />
                                </div>
                                {showDatePicker && (
                                    <div className="mt-2">
                                        <Calendar
                                            mode="single"
                                            selected={newTaskData.startDate ? new Date(newTaskData.startDate) : undefined}
                                            onSelect={(date) => {
                                                if (date) {
                                                    // Adjust for timezone offset
                                                    const adjustedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
                                                    handleTaskInputChange("startDate", adjustedDate);
                                                    //   console.log(new Date(adjustedDate).setMinutes(new Date(adjustedDate).getMinutes()+30))
                                                } else {
                                                    handleTaskInputChange("startDate", '');
                                                }
                                                setShowDatePicker(false);
                                            }}
                                            className="rounded-md border border-gray-800 w-fit bg-black"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="pt-5">
                                <Label>Duration</Label>
                                <SliderPrimitive.Root
                                    defaultValue={[50]}
                                    max={100}
                                    step={1}
                                    onValueChange={(value) => setSliderValue(value)}
                                    className="fixed flex w-[90%] touch-none select-none items-center bg-black"
                                >
                                    <SliderPrimitive.Track className=" h-2 w-full grow overflow-hidden rounded-full ">
                                        <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-[#a6a6a6] to-[#ffffff]" />
                                    </SliderPrimitive.Track>
                                    <SliderPrimitive.Thumb className=" block h-5 w-5 rounded-full border-2 border-primary bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
                                </SliderPrimitive.Root>
                            </div>
                            <div className="flex justify-between">
                                <span>How many minutes are you available?</span>
                                <span>{sliderValue[0]} min</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label>Set Reminder</Label>
                                    <Switch
                                        checked={showReminder}
                                        onCheckedChange={(checked) => setShowReminder(checked)}
                                    />
                                </div>
                                {showReminder && (
                                    <div className="space-y-2">
                                        <Label>Select Reminder Time</Label>
                                        <select
                                            className="bg-deep-blue w-[90%] mx-auto h-[3rem] pl-[1rem] mr-[2.5rem] text-[0.825rem] leading-8 border-none text-white rounded-none"
                                            onChange={(e) =>
                                                handleTaskInputChange("reminderTime", e.target.value)
                                            }
                                        >
                                            {REMINDER_TIMES.map((time) => (
                                                <option key={time.value} value={time.value}>
                                                    {time.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <Label>Repeat</Label>
                                    <Switch
                                        checked={showRepeat}
                                        onCheckedChange={(checked) => setShowRepeat(checked)}
                                    />
                                </div>
                                {showRepeat && (
                                    <div className="space-y-2">
                                        <Label>Select Days to Repeat</Label>
                                        <div className="flex gap-2">
                                            {DAYS_OF_WEEK.map((day) => (
                                                <Button
                                                    key={day.value}
                                                    size="sm"
                                                    className={`${selectedRepeatDays.includes(day.value) ? "bg-yellow-400" : "bg-[#0B1015]"
                                                        } border-gray-800`}
                                                    onClick={() => handleRepeatDaySelection(day.value)}
                                                >
                                                    {day.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Button
                            className="w-full bg-gradient-to-r from-[#a6a6a6] to-[#ffffff] mt-5 hover:bg-[#B39952] text-black"
                            onClick={HandleAddTask}
                        >
                            ADD TASK
                        </Button>
                    </div>
                </DrawerContent>
            </Drawer>
        </Container>
    );
}

