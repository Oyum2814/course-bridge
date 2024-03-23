import React from 'react';
import useSWR from 'swr';
import fetcher from "../lib/fetcher";

const useSubject = (subjectId:any)=>{
    const {data, error, isLoading, mutate } = useSWR(subjectId?`api/subject/${subjectId}`:null,fetcher);
    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default useSubject;