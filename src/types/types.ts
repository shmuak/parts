export interface ListItem {
    ManufacturerId: number;
    Name: string;
    ManufacturerName: string;
    URL?: string;
    Country: string;
    Type?: string;
  }
  
  export interface ManufacturerDetails {
    Address?: string;
    City?: string;
    ContactEmail?: string;
    ContactPhone?: string;
    Country?: string;
    ManufacturerTypes?: Array<{ Name: string }>;
    Mfr_Name?: string;
    PostalCode?: string;
    StateProvince?: string;
    WebURL?: string;
  }
  
  export interface SearchProps {
    onSearch: (name: string, type: string) => void;
    types: string[];
  }

  export interface PaginationData {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
}

export interface ListProps {
    results: ListItem[];
    pagination: PaginationData;
    onPageChange: (page: number) => void;
}
  
  export interface CardProps extends ListItem {
    onManufacturerClick?: (Mfr_ID: number) => void;
  }

  export interface InputProps {
    type?: string;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    disabled?: boolean;
  }