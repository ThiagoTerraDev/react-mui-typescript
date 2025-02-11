import { Api } from "../axios-config";


export interface ICitiesList {
  id: number;
  name: string;
}

export interface ICityDetail {
  id: number;
  name: string;
}

type TCitiesWithTotalCount = {
  data: ICitiesList[];
  totalCount: number;
}

const getAll = async (page = 1, filter = "", limit?: number): Promise<TCitiesWithTotalCount | Error> => {
  try {
    const relativeUrl = `/cities?_page=${page}&_limit=${limit ? limit : ""}&name_like=${filter}`;
    const { data, headers } = await Api.get(relativeUrl);

    if (data) {
      return {
        data,
        totalCount: Number(headers["x-total-count"]),
      };
    }

    return new Error("Error listing records");
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Error listing records");
  }
};

const getById = async (id: number): Promise<ICityDetail | Error> => {
  try {
    const { data } = await Api.get(`/cities/${id}`);

    if (data) {
      return data;
    }

    return new Error("Error fetching record");
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Error fetching record");
  }
};

const create = async (CityData: Omit<ICityDetail, "id">): Promise<number | Error> => {
  try {
    const { data } = await Api.post<ICityDetail>("/cities", CityData);

    if (data) {
      return data.id;
    }

    return new Error("Error creating record");
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Error creating record");
  }
};

const updateById = async (id: number, CityData: ICityDetail): Promise<void | Error> => {
  try {
    await Api.put(`/cities/${id}`, CityData);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Error updating record");
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/cities/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Error deleting record");
  }
};


export const CitiesService = {
  create,
  getAll,
  getById,
  deleteById,
  updateById,
};
