import AxiosInstance from "../axios";
import endPoints from "../endPoints";

export const getProducts = async () => {
    return await AxiosInstance.get(
        endPoints.getProducts
    )
}