"use client";

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./shadcn/pagination";
import { useSearchParams } from "next/navigation";

export interface PaginationData {
    page: number;
    totalPages: number;
    pageNumbers: Number[];
    prevPage: number;
    nextPage: number;
}



export default function CustomPagination({ page, totalPages, pageNumbers, prevPage, nextPage }: PaginationData) {
    const searchParams = useSearchParams();

    const buildUrlWithParams = (newParams: Record<string, string>) => { 
        const params = new URLSearchParams(searchParams.toString()); 
        Object.keys(newParams).forEach(key => { 
            params.set(key, newParams[key]); 
        }); 
        return `?${params.toString()}`; 
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {page === 1 ? <PaginationPrevious className='opacity-60' aria-disabled="true" /> : <PaginationPrevious href={buildUrlWithParams({ page: prevPage.toString() })} />}
                </PaginationItem>
                {pageNumbers.map((pageNumber, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink href={buildUrlWithParams({ page: pageNumber.toString() })} className={page === pageNumber ? "bg-brand-500 text-white" : ""}>{pageNumber.toString()}</PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    {page === totalPages ? <PaginationNext className='opacity-60' aria-disabled="true" /> : <PaginationNext href={buildUrlWithParams({ page: nextPage.toString() })} />}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}