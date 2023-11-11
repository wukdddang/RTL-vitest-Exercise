import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'

import SummaryForm from '../SummaryForm'

describe('SummraryForm 테스트', () => {
  test('첫 렌더링 시 체크박스는 비활성화 되어있어야 한다.', () => {
    render(<SummaryForm />)

    const checkbox = screen.getByRole('checkbox', { name: /I agree to Terms and Conditions/i })
    expect(checkbox).not.toBeChecked()

    const confirmButton = screen.getByRole('button', { name: /Confirm order/i })
    expect(confirmButton).toBeDisabled()
  })

  test('체크박스를 클릭하면 체크박스가 활성화 + 제출 버튼 비활성화', async () => {
    const user = userEvent.setup()
    render(<SummaryForm />)

    const checkbox = screen.getByRole('checkbox', { name: /I agree to Terms and Conditions/i })
    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    const confirmButton = screen.getByRole('button', { name: /Confirm order/i })
    expect(confirmButton).toBeEnabled()
  })

  test('체크박스를 두 번 클릭하면 체크박스가 비활성화 된다.', async () => {
    const user = userEvent.setup()
    render(<SummaryForm />)

    const checkbox = screen.getByRole('checkbox', { name: /I agree to Terms and Conditions/i })
    await user.click(checkbox)
    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()

    const confirmButton = screen.getByRole('button', { name: /Confirm order/i })
    expect(confirmButton).toBeDisabled()
  })

  test('Terms and Conditions의 색상이 hover시 blue로 변경되어야 한다.', async () => {
    const user = userEvent.setup()
    render(<SummaryForm />)

    const termsAndConditions = screen.getByText(/terms and conditions/i)
    expect(termsAndConditions).not.toHaveAttribute('style', 'color: red;')

    await user.hover(termsAndConditions)
    expect(termsAndConditions).toHaveStyle({ color: 'rgb(255, 0, 0)' })

    await user.unhover(termsAndConditions)
    expect(termsAndConditions).not.toHaveAttribute('style', 'color: red;')
  })
})
