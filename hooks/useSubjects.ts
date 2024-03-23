import React from 'react';
import useSWR from 'swr';
import fetcher from "../lib/fetcher";

const useSubjects = (userId?:any)=>{
    const {data, error, isLoading, mutate } = useSWR(userId?`api/subjects/${userId}`:'api/subjects',fetcher);
    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default useSubjects;