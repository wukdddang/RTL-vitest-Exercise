import './App.css'

import { useState } from 'react'

export function replaceCamelWithSpaces(colorName: string) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1')
}

const App = () => {
  const [buttonColor, setButtonColor] = useState('#C71585')
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const newButtonColor = buttonColor === '#C71585' ? '#191970' : '#C71585'

  return (
    <div>
      <button
        style={{
          backgroundColor: checkboxChecked ? 'gray' : buttonColor,
        }}
        disabled={checkboxChecked}
        onClick={() => setButtonColor(newButtonColor)}
      >
        {newButtonColor === '#C71585' ? '빨간색' : '파란색'}
        {'으로 변경'}
      </button>
      <input
        type={'checkbox'}
        id={'disable-button-checkbox'}
        defaultChecked={false}
        onClick={() => setCheckboxChecked(!checkboxChecked)}
      />
      <label htmlFor={'disable-button-checkbox'}>{'Disable button'}</label>
    </div>
  )
}

export default App
