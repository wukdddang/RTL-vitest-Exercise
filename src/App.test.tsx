import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { replaceCamelWithSpaces } from './App'
import App from './App'

test('버튼이 올바른 색상을 가지고 있고, 클릭했을 때 업데이트 된다.', () => {
  render(<App />)

  // 파란색으로 변경 버튼을 찾아서 테스트
  const colorButton = screen.getByRole('button', { name: /파란색으로 변경/i })
  // 버튼이 빨간색을 가지고 있는지 확인
  expect(colorButton).toHaveStyle({ backgroundColor: '#C71585' })

  // 버튼을 클릭했을 때 파란색으로 변경되는지 확인
  fireEvent.click(colorButton)
  expect(colorButton).toHaveStyle({ backgroundColor: '#191970' })

  // 버튼을 다시 클릭했을 때 빨간색으로 변경 텍스트가 나오는지 확인
  expect(colorButton).toHaveTextContent('빨간색으로 변경')
})

test('체크박스 상태', () => {
  render(<App />)

  // 첫 렌더링에 체크박스가 비활성화 되어 있는지 확인
  const colorButton = screen.getByRole('button', { name: /파란색으로 변경/i })
  expect(colorButton).toBeEnabled()
})

test('체크박스를 클릭했을 때 버튼이 비활성화 되는지 확인', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', { name: /파란색으로 변경/i })
  const checkbox = screen.getByRole('checkbox', { name: /Disable button/i })
  expect(checkbox).not.toBeChecked()

  // 체크박스를 클릭했을 때 버튼이 비활성화 되는지 확인
  fireEvent.click(checkbox)
  expect(checkbox).toBeChecked()

  expect(colorButton).toBeDisabled()
})

test('체크박스를 클릭했을 때 버튼의 색상이 회색으로 변경되는지 확인', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', { name: /파란색으로 변경/i })
  const checkbox = screen.getByRole('checkbox', { name: /Disable button/i })
  expect(checkbox).not.toBeChecked()

  // 체크박스를 클릭했을 때 버튼이 비활성화 되는지 확인
  fireEvent.click(checkbox)
  expect(checkbox).toBeChecked()

  expect(colorButton).toBeDisabled()
  expect(colorButton).toHaveAttribute('style', 'background-color: gray;')
})

describe('카멜케이스 앞에 공백을 추가하는 함수', () => {
  test('카멜케이스가 아닌 문장', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red')
  })

  test('카멜케이스인 문장', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue')
  })

  test('여러 문자로 이루어진 문장', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
  })
})
