interface NotificationProps{
    text: string;
    type: string;
    onClose: () => void;
}

export const Notification = ({text, type, onClose}: NotificationProps) => {
    return (
        <div>
            <span>{text}</span>
            <button onClick={onClose}
            className={type === 'success' ? "mb-1" : "p-4"}>x</button>
        </div>
    );
};