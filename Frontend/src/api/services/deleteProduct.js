import AxiosInstance from "../axios";
import endPoints from "../endPoints";

export const deleteProduct = async (id) => {
    return await AxiosInstance.delete(
        `${endPoints.deleteProduct}/${id}`
    )
}