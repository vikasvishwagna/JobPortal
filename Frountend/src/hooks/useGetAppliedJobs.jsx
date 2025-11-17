import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATIONS_API_END_POINT } from "@/utils/constants";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATIONS_API_END_POINT}/getAppliedJobs`, {withCredentials:true});
                console.log(res.data);
                if(res.data.success){
                    console.log(res.data.application)
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    },[])
};
export default useGetAppliedJobs;