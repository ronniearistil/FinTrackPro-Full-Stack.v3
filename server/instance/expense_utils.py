def get_category(expense_name):
    categories = {
        "Marketing Campaign": "Marketing",
        "Labor": "Labor",
        "Materials": "Materials",
        "Transportation": "Logistics",
        "Consultation": "Professional Services",
    }
    return categories.get(expense_name, "General")  # Default to "General"
