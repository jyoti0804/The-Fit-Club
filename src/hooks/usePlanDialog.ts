import { useState } from 'react'

export interface Plan {
  name: string
  price: number
  features: string[]
  icon?: React.ReactNode
}

export interface PlanDialogState {
  isOpen: boolean
  selectedPlan: Plan | null
}

const usePlanDialog = () => {
  const [dialogState, setDialogState] = useState<PlanDialogState>({
    isOpen: false,
    selectedPlan: null,
  })

  const openDialog = (plan: Plan) => {
    setDialogState({ isOpen: true, selectedPlan: plan })
  }

  const closeDialog = () => {
    setDialogState({ isOpen: false, selectedPlan: null })
  }

  return { dialogState, openDialog, closeDialog }
}

export default usePlanDialog;
