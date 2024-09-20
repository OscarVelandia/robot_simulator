import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RobotSimulator } from './Pages/RobotSimulator/RobotSimulator.tsx'

import './styles/reset.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RobotSimulator />
  </StrictMode>,
)
