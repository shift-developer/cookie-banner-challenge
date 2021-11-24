import { useCallback, useState } from "react"

export const usePickerColor = (initialState = {}) => {
    const [values, setValues] = useState(initialState)
    const reset = () => {
        setValues(initialState)
    }
    const handleColorChange = useCallback((value, pickerName) => {
        setValues({
            ...values,
            [pickerName]: value
        })
    }, [values])

    return [values, handleColorChange, reset]
}