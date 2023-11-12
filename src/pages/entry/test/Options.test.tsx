import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import Options from '../Options'

test('서버로부터 받아온 scoop 옵션들이 화면에 보여야 한다.', async () => {
  render(<Options optionType={'scoops'} />)

  const scoopImages = (await screen.findAllByRole('img', { name: /scoop$/i })) as HTMLImageElement[]
  expect(scoopImages).toHaveLength(2)

  const altText = scoopImages.map((element) => element.alt)
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('서버로부터 받아온 topping 옵션들이 화면에 보여야 한다.', async () => {
  render(<Options optionType={'toppings'} />)

  const toppingImages = (await screen.findAllByRole('img', {
    name: /topping$/i,
  })) as HTMLImageElement[]
  expect(toppingImages).toHaveLength(3)

  const altText = toppingImages.map((element) => element.alt)
  expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping'])
})
