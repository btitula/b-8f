import httpsRequest from "../utils/httpsRequest";

const logout = () => {
    axios.get(import.meta.env.VITE_BASE_URL + "/auth/me");
};

const currentUser = async () => {
    try {
        const response = await httpsRequest.get("/auth/me");

        const data = response.data.data.posts;
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

export default {
    currentUser,
};
