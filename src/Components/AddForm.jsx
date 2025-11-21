import React from 'react'

function AddForm() {
    const [showForm, setShowForm] = usestate(false)
    const [items, setItems] = usestate([])
    const [formData, setFormData] = ({
        title: "",
        description: "",
        createdAt: "",
    })

    const OpenForm = () => {
        const now = new Date().toLocaleString()
        setFormData({
            title: "",
            description: "",
            createdAt: now,
        })
        setShowForm(true)
    }

    const closeForm = () => {
        setShowForm(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    const handleSave = (e) => {
        e.preventDefault()
        if (!formData.title.trim() || formData.description.trim()) {
            alert("Please fill title and description")
            return
        }
        setItems((prev) => [...prev, formData])
        setShowForm(false)
    }
    return (
        <div>AddForm</div>
    )
}

export default AddForm 