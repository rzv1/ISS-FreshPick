import {useState} from "react";
import {useServices} from "../context/ServiceContext.tsx";
import {Header} from "./Header.tsx";
import {Notification} from "./Notification.tsx";

export const AddProductPage = () => {
    const container = useServices();
    const service = container.inventoryService;
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [ttl, setTtl] = useState(0);

    const handleSave = async () => {
        const item = await service.saveProduct(name, price, image, ttl);
        if(item){
            setAlertMessage("Added product with id " + item.id);
            setAlertType("success");
            setName("");
            setPrice(0);
            setImage("");
            setTtl(0);
        }
        else{
            setAlertMessage("Incomplete fields!");
            setAlertType("fail")
        }
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    }

    return (
        <div>
            <Header title="Add New Product" />

            <div className="flex flex-col gap-5 mt-8">
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-500 ml-1" htmlFor="name">
                        Product Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#f1f3ed] border border-[#d4d9cc] rounded-xl px-4 py-3.5 text-gray-800 outline-none focus:border-[#7b8964] transition-colors shadow-sm"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-500 ml-1" htmlFor="price">
                        Price (Lei)
                    </label>
                    <input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        className="w-full bg-white border border-[#d4d9cc] rounded-xl px-4 py-3.5 text-gray-800 outline-none focus:border-[#7b8964] transition-colors shadow-sm"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-500 ml-1" htmlFor="image">
                        Image URL
                    </label>
                    <input
                        id="image"
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full bg-[#f1f3ed] border border-[#d4d9cc] rounded-xl px-4 py-3.5 text-gray-800 outline-none focus:border-[#7b8964] transition-colors shadow-sm"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-500 ml-1" htmlFor="TTL">
                        Time to live
                    </label>
                    <select
                        id="TTL"
                        value={ttl}
                        onChange={(e) => setTtl(Number(e.target.value))}
                        className="w-full bg-white border border-[#d4d9cc] rounded-xl px-4 py-3.5 text-gray-800 outline-none focus:border-[#7b8964] transition-colors shadow-sm appearance-none"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em 1.2em' }}
                    >
                        <option value={0}>Select time...</option>
                        <option value={12}>12 hours</option>
                        <option value={24}>24 hours</option>
                        <option value={36}>36 hours</option>
                        <option value={48}>48 hours</option>
                    </select>
                </div>

                <button
                    onClick={handleSave}
                    style={{backgroundColor: '#7b8964'}}
                    className="w-full mt-6 text-white font-medium text-lg py-4 rounded-full transition-colors shadow-md"
                >
                    Save Product
                </button>
            </div>

            {showAlert && (
                <Notification text={alertMessage} type={alertType} onClose={() => setShowAlert(false)} />
            )}
        </div>
    );
}