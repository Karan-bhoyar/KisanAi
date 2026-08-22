from pydantic import BaseModel


class DiseaseResponse(BaseModel):

    category: str

    disease_name: str

    confidence: str

    description: str

    treatment: str

    prevention: str

    history_id: int

    # PDF Report URL
    pdf_url: str

    # Email Status
    email_sent: bool