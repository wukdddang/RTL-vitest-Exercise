import { render, RenderOptions } from '@testing-library/react'

import { OrderDetailsProvider } from '../contexts/OrderDetails'

interface ExtendedRenderOptions extends RenderOptions {
  wrapper?: React.ComponentType
}

const renderWithContext = (ui: React.ReactElement, options?: ExtendedRenderOptions) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { renderWithContext as render }
