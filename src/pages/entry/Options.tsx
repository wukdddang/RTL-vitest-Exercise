import axios from 'axios'
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'

import { IceCreamSundae, PRICE_PER_ITEM, TasteOfScoops, TasteOfToppings } from '../../constants'
import { useOrderDetails } from '../../contexts/OrderDetails'
import AlertBanner from '../common/AlertBanner'
import ScoopOption from './ScoopOption'
import ToppingOption from './ToppingOption'

type Item = {
  name: TasteOfScoops | TasteOfToppings
  imagePath: string
}

const Options = ({ optionType }: { optionType: IceCreamSundae }) => {
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState(false)
  const { totals } = useOrderDetails()

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch(() => setError(true))
  }, [optionType])

  if (error) {
    return <AlertBanner />
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

  const optionItems = items.map((item) => (
    <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
  ))

  return (
    <>
      <h2>{title}</h2>
      <p>
        {'각 '}
        {PRICE_PER_ITEM[optionType]}
        {'원'}
      </p>
      <p>
        {'총 '}
        {totals[optionType]}
        {'원'}
      </p>
      <Row>{optionItems}</Row>
    </>
  )
}

export default Options
