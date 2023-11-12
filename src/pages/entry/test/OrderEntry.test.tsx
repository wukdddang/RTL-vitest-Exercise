import { render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { expect, test } from 'vitest'

import { server } from '../../../mocks/server'
import OrderEntry from '../OrderEntry'

test('scoops, toppings 라우팅 에러 테스트', async () => {
  server.resetHandlers(
    http.get('http://localhost:3030/scoops', () => {
      return new HttpResponse(null, { status: 500 })
    }),

    http.get('http://localhost:3030/toppings', () => {
      return new HttpResponse(null, { status: 500 })
    }),
  )

  render(<OrderEntry />)

  await waitFor(async () => {
    const alerts = await screen.findAllByText(
      /예상치 못한 에러가 발생했습니다. 나중에 다시 시도해주세요./i,
    )
    expect(alerts).toHaveLength(2)
  })
})
