import React from 'react';
import useSWR from 'swr';
import fetcher from "../lib/fetcher";

const useDocuments = (subjectId:string)=>{
    const {data, error, isLoading, mutate } = useSWR(subjectId?`/api/files/${subjectId}`:null,fetcher);
    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default useDocuments;