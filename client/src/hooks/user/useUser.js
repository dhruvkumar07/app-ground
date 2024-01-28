import { useQuery } from "react-query";
import { getAuthenticatedUser } from "../../api";
import { toast } from "react-toastify";


const useUser = () => {
    const {data , isLoading , isError , refetch } = useQuery(
        "user",
        async () => {
            try {
                const userDetail = await getAuthenticatedUser();
                toast.success("Login successful")
                return userDetail;
            } catch (error) {
                console.error(error);
                toast.error(error);
            }
        },
        {
            refetchOnWindowFocus: false,
        }
    )

    return {
        data,
        isLoading,
        isError,
        refetch,
    }
}

export default useUser;