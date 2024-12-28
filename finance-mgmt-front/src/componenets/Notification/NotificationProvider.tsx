import { createContext, ReactNode, useState } from "react";
import {Notification, NotificationProps} from "./Notification";

interface NotificationContextType {
    notification: NotificationProps | null;
    setNotification: React.Dispatch<React.SetStateAction<NotificationProps | null>>;
}

export const NotificationContext = createContext<NotificationContextType | null>(null);

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider = (props: NotificationProviderProps) => {
    const [notification, setNotification] = useState<NotificationProps | null>(null);

    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {props.children}
            {notification && <Notification   duration={notification.duration} message={notification.message} type={notification.type} key={notification.id}/>}
        </NotificationContext.Provider>
    );
};
