import { useState } from 'react'

const SummaryForm = () => {
  const [tcChecked, setIsChecked] = useState(false)
  const [hoverStatus, setHoverStatus] = useState(false)

  const handleMouseEnter = () => {
    setHoverStatus(true)
  }

  const handleMouseLeave = () => {
    setHoverStatus(false)
  }

  const checkboxLabel = (
    <span>
      {'I agree to '}
      <span
        style={{ color: hoverStatus ? 'red' : 'blue' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {' Terms and Conditions'}
      </span>
    </span>
  )

  return (
    <form>
      <div>
        <input
          type={'checkbox'}
          id={'confirm-checkbox'}
          checked={tcChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label htmlFor={'confirm-checkbox'}>{checkboxLabel}</label>
      </div>
      <button disabled={!tcChecked}>{'Confirm order'}</button>
    </form>
  )
}

export default SummaryForm
