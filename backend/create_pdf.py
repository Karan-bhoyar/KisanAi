from reportlab.pdfgen import canvas


file_path = "app/uploads/scheme.pdf"


pdf = canvas.Canvas(file_path)


text = """
PM Kisan Samman Nidhi Yojana

This scheme provides financial support to farmers.

Farmers receive income support from the government.


Eligibility:
1. Farmer must have agricultural land.
2. Farmer should be registered under the scheme.

Benefits:
Farmers receive financial assistance directly into their bank accounts.

Agriculture schemes help farmers improve productivity and income.
"""


pdf.drawString(50, 750, "Kisan AI Government Scheme Document")


y = 700

for line in text.split("\n"):
    pdf.drawString(50, y, line)
    y -= 20


pdf.save()

print("PDF created successfully")