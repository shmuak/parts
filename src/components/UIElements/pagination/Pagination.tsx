import React from 'react';
import { PaginationData } from '../../../types/types';
import './pagination.scss';

interface PaginationProps {
    pagination: PaginationData;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ pagination, onPageChange }) => {
    const { currentPage, itemsPerPage, totalItems } = pagination;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
            >
                &laquo; Prev
            </button>
            
            <span className="pagination-info">
                Page {currentPage} of {totalPages}
            </span>
            
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
            >
                Next &raquo;
            </button>
        </div>
    );
};