import axiosClient from "./axiosClient";

const storeProxy: Record<string, string> = {};

export const fetchDetail = async (name: string) => {
  if (storeProxy[name]) {
    return storeProxy[name];
  }
  const url = `/public/detail`;
  const result = await axiosClient.post(url, { name });
  if (result?.data?.code !== 0) {
    throw new Error(result.data?.msg ?? result?.data);
  }
  storeProxy[name] = result.data.data;
  return result.data.data;
};
