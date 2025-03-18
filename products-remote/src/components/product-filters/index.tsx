import React from 'react';
import { Card, Select, Input, Slider, Button, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCategoriesQuery } from '@/services/api/products';
import {
  setCategory,
  setSearchTerm,
  setPriceRange,
  setSortOrder,
  resetFilters,
} from '@/store/slices/filtersSlice';
import { RootState } from '@/store';

const { Option } = Select;
const { Search } = Input;

const ProductFilters: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const { data: categories } = useGetCategoriesQuery();

  const handleCategoryChange = (value: string) => {
    dispatch(setCategory(value));
  };

  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  const handlePriceChange = (value: [number, number]) => {
    dispatch(setPriceRange({ minPrice: value[0], maxPrice: value[1] }));
  };

  const handleSortChange = (value: string) => {
    dispatch(setSortOrder(value));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <Card title="Filtreler" style={{ marginBottom: 16 }}>
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <div>
          <label>Kategori:</label>
          <Select
            style={{ width: '100%' }}
            value={filters.category}
            onChange={handleCategoryChange}
            allowClear
            placeholder="Kategori seçin"
          >
            {categories?.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </div>

        <div>
          <label>Ara:</label>
          <Search
            placeholder="Ürün ara..."
            value={filters.searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label>Fiyat Aralığı:</label>
          <Slider
            range
            min={0}
            max={10000}
            value={[filters.minPrice || 0, filters.maxPrice || 10000]}
            onChange={handlePriceChange}
          />
        </div>

        <div>
          <label>Sıralama:</label>
          <Select
            style={{ width: '100%' }}
            value={filters.sortOrder}
            onChange={handleSortChange}
            placeholder="Sıralama seçin"
          >
            <Option value="price-asc">Fiyat (Düşükten Yükseğe)</Option>
            <Option value="price-desc">Fiyat (Yüksekten Düşüğe)</Option>
            <Option value="rating-desc">Puan (En Yüksek)</Option>
          </Select>
        </div>

        <Button type="primary" onClick={handleReset} block>
          Filtreleri Sıfırla
        </Button>
      </Space>
    </Card>
  );
};

export default ProductFilters;