const CartModule = (() => {
  const items = [];

  const findItem = (id) => {
    return items.find((item) => item.id === id);
  };

  const addItem = (item) => {
    const existingItem = findItem(item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity ?? 1;
      return;
    }

    items.push({
      ...item,
      quantity: item.quantity ?? 1,
    });
  };

  const removeItem = (id) => {
    const index = items.findIndex((item) => item.id === id);

    if (index !== -1) {
      items.splice(index, 1);
    }
  };

  const updateQuantity = (id, quantity) => {
    const item = findItem(id);

    if (!item) {
      return;
    }

    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    item.quantity = quantity;
  };

  const getItems = () => {
    return items.map((item) => ({ ...item }));
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clear = () => {
    items.length = 0;
  };

  return {
    addItem,
    removeItem,
    updateQuantity,
    getItems,
    getTotal,
    clear,
  };
})();

//Tests

console.log("Initial items:", CartModule.getItems());

CartModule.addItem({
  id: 1,
  name: "Laptop",
  price: 1000,
  quantity: 1,
});

CartModule.addItem({
  id: 2,
  name: "Mouse",
  price: 50,
  quantity: 2,
});

console.log("Items", CartModule.getItems());

console.log("Total:", CartModule.getTotal());

CartModule.updateQuantity(1, 2);

console.log("After quantity update:", CartModule.getItems());

CartModule.removeItem(2);

console.log("After removal:", CartModule.getItems());

CartModule.clear();

console.log("After clear:", CartModule.getItems());

//Prove items is private

console.log("Direct items access:", CartModule.items);
// the output will be undefined

//Prove getItems() returns a copy

CartModule.addItem({
  id: 3,
  name: "Keyboard",
  price: 75,
  quantity: 1,
});

const externalItems = CartModule.getItems();

console.log("External items:", externalItems);

externalItems.push({
  id: 999,
  name: "Fake Item",
  price: 0,
  quantity: 1,
});

externalItems[0].name = "Hacked Keyboard";

console.log("Modified external items:", externalItems);

console.log("Actual cart items:", CartModule.getItems());
