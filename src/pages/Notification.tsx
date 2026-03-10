interface NotificationProps{
    text: string;
    type: string;
    onClose: () => void;
}

export const Notification = ({text, type, onClose}: NotificationProps) => {
    return (
        <div className={`${type === 'fail' ? "bg-[#fde7e7]" : "bg-[#e7f3e5]"} p-4 rounded-2xl fixed bottom-1/10 left-1/5`}>
            <span className="font-medium mr-2">{text}</span>
            <button className="font-bold" onClick={onClose}>x</button>
        </div>
    );
};