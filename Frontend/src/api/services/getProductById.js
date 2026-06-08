import AxiosInstance from "../axios";
import endPoints from "../endPoints";

export const getProductById = async (id) => {
    return await AxiosInstance.get(
        `${endPoints.getSingleProduct}/${id}`
    )
}