import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./shadcn/pagination";

export interface PaginationData {
    page: number;
    totalPages: number;
    pageNumbers: Number[];
    prevPage: number;
    nextPage: number;
}

export default function CustomPagination({ page, totalPages, pageNumbers, prevPage, nextPage }: PaginationData) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {page === 1 ? <PaginationPrevious className='opacity-60' aria-disabled="true" /> : <PaginationPrevious href={`?page=${prevPage}`} />}
                </PaginationItem>
                {pageNumbers.map((pageNumber, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink href={`?page=${pageNumber}`} className={page === pageNumber ? "bg-brand-500 text-white" : ""}>{pageNumber.toString()}</PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    {page === totalPages ? <PaginationNext className='opacity-60' aria-disabled="true" /> : <PaginationNext href={`?page=${nextPage}`} />}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}