import {useEffect, useState} from "react";
export type NotificationType = "success" | "error" | "info" | "warning";
export interface NotificationProps {
    id?:number,
    message: string,
    type: NotificationType,
    duration:number
}
export const Notification = (props:NotificationProps) => {
    const [isVisible,setIsVisible] = useState<boolean>(true);
    const typeClasses: Record<NotificationType, string> = {
        success: "bg-green-100 border-green-500 text-green-700",
        error: "bg-red-100 border-red-500 text-red-700",
        info: "bg-blue-100 border-blue-500 text-blue-700",
        warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        },props.duration);

        return () => clearTimeout(timer);
    }, [props.duration]);

    return (
        <>
        {isVisible&&(
        <div
            className={`absolute z-50 max-w-sm mx-auto mt-4 p-4 rounded-lg shadow-md border-l-4 top-5 right-5 ${
                typeClasses[props.type]
            }`}
        >
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{props.message}</span>
            </div>
        </div>)}</>
    );
};


