import { Environment } from "../../../environment";
import { Api } from "../axios-config";


interface IMembersList {
  id: number;
  email: string;
  fullName: string;
  cityId: number;
}

interface IMemberDetail {
  id: number;
  email: string;
  fullName: string;
  cityId: number;
}

type TMembersWithTotalCount = {
  data: IMembersList[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ""): Promise<TMembersWithTotalCount | Error> => {
  try {
    const relativeUrl = `/members?_page=${page}&_limit=${Environment.MAXIMUM_ROWS}&fullName_like=${filter}`;
    const { data, headers } = await Api.get(relativeUrl);

    if (data) {
      return {
        data,
        totalCount: Number(headers["x-total-count"] || Environment.MAXIMUM_ROWS),
      };
    }

    return new Error("Error listing records");
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Error listing records");
  }
};

const getById = async (id: number): Promise<IMemberDetail | Error> => {
  try {
    const { data } = await Api.get(`/members/${id}`);

    if (data) {
      return data;
    }

    return new Error("Error fetching record");
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Error fetching record");
  }
};

const create = async (memberData: Omit<IMemberDetail, "id">): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IMemberDetail>("/members", memberData);

    if (data) {
      return data.id;
    }

    return new Error("Error creating record");
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Error creating record");
  }
};

const updateById = async (id: number, memberData: IMemberDetail): Promise<void | Error> => {
  try {
    await Api.put(`/members/${id}`, memberData);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Error updating record");
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/members/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Error deleting record");
  }
};


export const MembersService = {
  create,
  getAll,
  getById,
  deleteById,
  updateById,
};
