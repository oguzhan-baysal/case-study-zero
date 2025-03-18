import basketReducer, {
  addToBasket,
  removeFromBasket,
  updateQuantity,
  clearBasket,
  BasketItem,
} from './basketSlice';

describe('basketSlice', () => {
  const initialState = {
    items: [],
    totalAmount: 0,
  };

  const testItem: BasketItem = {
    id: 1,
    name: 'Test Ürün',
    price: 100,
    quantity: 1,
  };

  it('should handle initial state', () => {
    expect(basketReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('addToBasket', () => {
    it('should add new item to empty basket', () => {
      const actual = basketReducer(initialState, addToBasket(testItem));
      expect(actual.items).toHaveLength(1);
      expect(actual.items[0]).toEqual(testItem);
      expect(actual.totalAmount).toBe(100);
    });

    it('should increase quantity for existing item', () => {
      const stateWithItem = basketReducer(initialState, addToBasket(testItem));
      const actual = basketReducer(stateWithItem, addToBasket({ ...testItem, quantity: 2 }));
      expect(actual.items).toHaveLength(1);
      expect(actual.items[0].quantity).toBe(3);
      expect(actual.totalAmount).toBe(300);
    });
  });

  describe('removeFromBasket', () => {
    it('should remove item from basket', () => {
      const stateWithItem = basketReducer(initialState, addToBasket(testItem));
      const actual = basketReducer(stateWithItem, removeFromBasket(testItem.id));
      expect(actual.items).toHaveLength(0);
      expect(actual.totalAmount).toBe(0);
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const stateWithItem = basketReducer(initialState, addToBasket(testItem));
      const actual = basketReducer(
        stateWithItem,
        updateQuantity({ id: testItem.id, quantity: 3 })
      );
      expect(actual.items[0].quantity).toBe(3);
      expect(actual.totalAmount).toBe(300);
    });
  });

  describe('clearBasket', () => {
    it('should clear all items from basket', () => {
      const stateWithItem = basketReducer(initialState, addToBasket(testItem));
      const actual = basketReducer(stateWithItem, clearBasket());
      expect(actual.items).toHaveLength(0);
      expect(actual.totalAmount).toBe(0);
    });
  });
});