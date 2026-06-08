import AxiosInstance from "../axios";
import endPoints from "../endPoints";

export const updateProduct= async (id,data) => {
    return await AxiosInstance.put(
        `${endPoints.updateProduct}/${id}`,data
    )
}