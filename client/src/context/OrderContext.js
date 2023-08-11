import { createContext, useEffect, useMemo, useState } from "react";

export const OrderContext = createContext();

export const OrderContextProvider = (props) => {
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  const pricePerItem = {
    products: 1000,
    options: 500,
  };

  const calculateSubtotal = (orderType, orderCounts) => {
    let optionCount = 0;
    for (const count of orderCounts[orderType].values()) {
      optionCount += count;
    }

    return optionCount * pricePerItem[orderType];
  };

  useEffect(() => {
    const productsTotal = calculateSubtotal("products", orderCounts);
    const optionsTotal = calculateSubtotal("options", orderCounts);
    const total = productsTotal + optionsTotal;

    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total: total,
    });
  }, [orderCounts]);

  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, orderType) => {
      const newOrderCounts = { ...orderCounts };
      const orderCountMap = orderCounts[orderType];
      orderCountMap.set(itemName, parseInt(newItemCount));

      setOrderCounts(newOrderCounts);
    };

    return [{ ...orderCounts, totals }, updateItemCount];
  }, [orderCounts, totals]);

  // return <OrderContext.Provider value>{props.childeren}</OrderContext.Provider>;
  return <OrderContext.Provider value={value} {...props} />;
};
