import AxiosInstance from "../axios";
import endPoints from "../endPoints";

export const createProduct = async (data) => {
    return await AxiosInstance.post(
        endPoints.createProduct,
        data
    )
}