import { useState, KeyboardEvent, ChangeEvent, useCallback } from 'react';
import { Input } from '../UIElements/inputSearch/inputSearch';
import { List } from '../list/List';
import { dataFetch } from '../../data/dataFetch';
import { getAllTypes } from '../../data/fetchByType';
import { ListItem, PaginationData } from '../../types/types';
import { useEffect } from 'react';
import './search.scss'

export const Search = () => {
    const [inputValue, setInputValue] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [types, setTypes] = useState<string[]>([]);
    const [results, setResults] = useState<ListItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<PaginationData>({
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0
    });

    useEffect(() => {
        const loadTypes = async () => {
            try {
                const allTypes = await getAllTypes();
                setTypes(allTypes);
            } catch (err) {
                console.error("Failed to load types", err);
            }
        };
        
        loadTypes();
    }, []);

    const handleSearch = useCallback(async (page: number = 1) => {
        setIsLoading(true);
        setError(null);
        setPagination(prev => ({ ...prev, currentPage: page }));
        
        try {
            const { results: data, totalCount } = await dataFetch(
                inputValue, 
                selectedType,
                page,
                pagination.itemsPerPage
            );
            
            setResults(data);
            setPagination(prev => ({ ...prev, totalItems: totalCount }));
            
            if (data.length === 0) {
                setError('No parts found with these criteria');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch data. Please try again.');
            setResults([]);
            setPagination(prev => ({ ...prev, totalItems: 0 }));
        } finally {
            setIsLoading(false);
        }
    }, [inputValue, selectedType, pagination.itemsPerPage]);

    useEffect(() => {
        if (selectedType !== '' || inputValue !== '') {
            const timer = setTimeout(() => {
                handleSearch(1); 
            }, 300);
            
            return () => clearTimeout(timer);
        }
    }, [selectedType, inputValue, handleSearch]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setError(null);
    };

    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch(1);
        }
    };

    const handlePageChange = (page: number) => {
        handleSearch(page);
    };

    return (
        <div>
            <div className='search'>
                <Input
                    className='search-button'
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter part name"
                    disabled={isLoading}
                />
                
                <select 
                    value={selectedType}
                    onChange={handleTypeChange}
                    disabled={isLoading || types.length === 0}
                    className='type-select'
                >
                    {types.length === 0 ? (
                        <option value="">Loading types...</option>
                    ) : (
                        <>
                            <option value="">All Types</option>
                            {types.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </>
                    )}
                </select>
                
                <button 
                    onClick={() => handleSearch(1)} 
                    disabled={isLoading}
                    className='search-button'
                >
                    {isLoading ? "Searching..." : "Search"}
                </button>
            </div>

            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

            <List 
                results={results} 
                pagination={pagination}
                onPageChange={handlePageChange}
            />
        </div>
    );
};