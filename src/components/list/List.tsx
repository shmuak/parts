import { Card } from '../card/Card';
import { ListProps } from '../../types/types';
import { Pagination } from '../UIElements/pagination/Pagination';

import './list.scss';
export const List: React.FC<ListProps> = ({ results, pagination, onPageChange }) => {
  return (
    <div className='list'>
      {results.length > 0 && (
        <>
          <ul style={{ padding: 0 }}>
            {results.map((item) => (
              <Card key={`${item.ManufacturerId}-${item.Name}`} {...item} />
            ))}
          </ul>
          <Pagination pagination={pagination} onPageChange={onPageChange} />
        </>
      )}
    </div>
  );
};