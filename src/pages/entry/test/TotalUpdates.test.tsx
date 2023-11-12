import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'

import { OrderDetailsProvider } from '../../../contexts/OrderDetails'
import Options from '../Options'

test('scoop이 업데이트 될 때마다 소계를 업데이트한다.', async () => {
  const user = userEvent.setup()
  render(<Options optionType={'scoops'} />, { wrapper: OrderDetailsProvider })

  // 총계는 0원으로 시작한다.
  const scoopsSubtotal = screen.getByText('총 ', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent('0')

  // Vanilla scoops를 1개 추가하고 소계를 확인한다.
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })

  await user.type(vanillaInput, '1')
  expect(scoopsSubtotal).toHaveTextContent('2000')

  // Chocolate scoops를 2개 추가하고 소계를 확인한다.
  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' })

  await user.clear(chocolateInput)
  await user.type(chocolateInput, '2')
  expect(scoopsSubtotal).toHaveTextContent('6000')
})
