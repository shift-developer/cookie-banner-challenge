import { useState } from "react"

export const usePickerColor = (initialState = {}) => {
    const [values, setValues] = useState(initialState)
    const reset = () => {
        setValues(initialState)
    }
    const handleColorChange = (value, pickerName) => {
        setValues({
            ...values,
            [pickerName]: value
        })
    }

    return [values, handleColorChange, reset]
}