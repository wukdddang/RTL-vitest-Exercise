import { Form } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'

import { TasteOfScoops, TasteOfToppings } from '../../constants'
import { useOrderDetails } from '../../contexts/OrderDetails'

const ToppingOption = ({
  name,
  imagePath,
}: {
  name: TasteOfScoops | TasteOfToppings
  imagePath: string
}) => {
  const { updateItemCount } = useOrderDetails()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateItemCount(name, e.target.checked ? 1 : 0, 'toppings')
  }
  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type={'checkbox'} onChange={handleChange} label={name} />
      </Form.Group>
    </Col>
  )
}

export default ToppingOption
