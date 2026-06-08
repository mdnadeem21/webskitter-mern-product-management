import AxiosInstance from "../axios";
import endPoints from "../endPoints";

export const softDeleteProduct = async (id) => {
  return await AxiosInstance.put(
    `${endPoints.softDeleteProduct}/${id}`,
    
  );
};