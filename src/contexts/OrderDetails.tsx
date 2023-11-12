import { createContext, useContext, useState } from 'react'

import { IceCreamSundae, PRICE_PER_ITEM, TasteOfScoops, TasteOfToppings } from '../constants'

const OrderDetails = createContext({
  optionCounts: {
    scoops: {
      Chocolate: 0,
      Vanilla: 0,
    },
    toppings: {
      Cherries: 0,
      'M&Ms': 0,
      'Hot Fudge': 0,
    },
  },
  totals: {
    scoops: 0,
    toppings: 0,
  },
  updateItemCount: (
    itemName: TasteOfScoops | TasteOfToppings,
    newItemCount: number,
    optionType: IceCreamSundae,
  ) => {},
  resetOrder: () => {},
})

const useOrderDetails = () => {
  const contextValue = useContext(OrderDetails)

  if (!contextValue) {
    throw new Error('useOrderDetails must be used within an OrderDetailsProvider')
  }

  return contextValue
}

const OrderDetailsProvider = (props: { children: React.ReactNode }) => {
  const [optionCounts, setOptionCounts] = useState<{
    scoops: { [key in TasteOfScoops]: number }
    toppings: { [key in TasteOfToppings]: number }
  }>({
    scoops: {
      Chocolate: 0,
      Vanilla: 0,
    }, // example: { vanilla: 2, chocolate: 1 }
    toppings: {
      Cherries: 0,
      'M&Ms': 0,
      'Hot Fudge': 0,
    }, // example: { 'cherries': 1 }
  })

  const updateItemCount = (
    itemName: TasteOfScoops | TasteOfToppings,
    newItemCount: number,
    optionType: IceCreamSundae,
  ) => {
    const newOptionCounts = {
      ...optionCounts,
      [optionType]: {
        ...optionCounts[optionType],
        [itemName]: newItemCount,
      },
    }

    setOptionCounts(newOptionCounts)
  }

  const resetOrder = () => {
    setOptionCounts({
      scoops: {
        Chocolate: 0,
        Vanilla: 0,
      },
      toppings: {
        Cherries: 0,
        'M&Ms': 0,
        'Hot Fudge': 0,
      },
    })
  }

  const calculateTotal = (optionType: IceCreamSundae) => {
    const countsArray = Object.values(optionCounts[optionType])
    const totalCount = countsArray.reduce((acc, curr) => acc + curr, 0)
    return totalCount * PRICE_PER_ITEM[optionType]
  }

  const totals = {
    scoops: calculateTotal('scoops'),
    toppings: calculateTotal('toppings'),
  }

  const value = { optionCounts, totals, updateItemCount, resetOrder }
  return <OrderDetails.Provider value={value} {...props} />
}

export { OrderDetails, OrderDetailsProvider, useOrderDetails }
