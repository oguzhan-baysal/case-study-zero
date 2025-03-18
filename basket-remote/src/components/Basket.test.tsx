import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import basketReducer, { addToBasket } from '../store/basketSlice';
import Basket from './Basket';

const createTestStore = () => {
  return configureStore({
    reducer: {
      basket: basketReducer,
    },
  });
};

describe('Basket Component', () => {
  it('should render empty basket message when no items', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <Basket />
      </Provider>
    );

    expect(screen.getByText('Sepetiniz boş')).toBeInTheDocument();
  });

  it('should render basket items and total amount', () => {
    const store = createTestStore();
    const testItem = {
      id: 1,
      name: 'Test Ürün',
      price: 100,
      quantity: 2,
    };

    store.dispatch(addToBasket(testItem));

    render(
      <Provider store={store}>
        <Basket />
      </Provider>
    );

    expect(screen.getByText('Test Ürün')).toBeInTheDocument();
    expect(screen.getByText('Birim Fiyat: 100.00 TL')).toBeInTheDocument();
    expect(screen.getByText('Toplam: 200.00 TL')).toBeInTheDocument();
  });

  it('should update quantity when input changes', () => {
    const store = createTestStore();
    const testItem = {
      id: 1,
      name: 'Test Ürün',
      price: 100,
      quantity: 1,
    };

    store.dispatch(addToBasket(testItem));

    render(
      <Provider store={store}>
        <Basket />
      </Provider>
    );

    const quantityInput = screen.getByRole('spinbutton');
    fireEvent.change(quantityInput, { target: { value: '2' } });

    expect(screen.getByText('Toplam: 200.00 TL')).toBeInTheDocument();
  });

  it('should remove item when delete button is clicked', () => {
    const store = createTestStore();
    const testItem = {
      id: 1,
      name: 'Test Ürün',
      price: 100,
      quantity: 1,
    };

    store.dispatch(addToBasket(testItem));

    render(
      <Provider store={store}>
        <Basket />
      </Provider>
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(screen.getByText('Sepetiniz boş')).toBeInTheDocument();
  });

  it('should clear basket when clear button is clicked', () => {
    const store = createTestStore();
    const testItem = {
      id: 1,
      name: 'Test Ürün',
      price: 100,
      quantity: 1,
    };

    store.dispatch(addToBasket(testItem));

    render(
      <Provider store={store}>
        <Basket />
      </Provider>
    );

    const clearButton = screen.getByText('Sepeti Temizle');
    fireEvent.click(clearButton);

    expect(screen.getByText('Sepetiniz boş')).toBeInTheDocument();
  });
});