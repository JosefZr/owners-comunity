import { useQuery } from "react-query";

const fetchAllUsers = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_API}/api/v1/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        },

    });

    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    const data = response.json()
    return data
};

export const useGetAllUsers = () => {
    return useQuery(["users"], () => fetchAllUsers(), {
    });
};
