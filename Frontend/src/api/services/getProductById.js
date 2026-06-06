import AxiosInstance from "../axios";
import endPoints from "../endPoints";

export const getProducts = async (id) => {
    return await AxiosInstance.get(
        `${endPoints.getSingleProduct}/${id}`
    )
}