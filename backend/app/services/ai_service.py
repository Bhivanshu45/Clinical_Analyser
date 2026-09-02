from groq import Groq

from app.core.config import GROQ_API_KEY, GROQ_MODEL


client = Groq(
    api_key=GROQ_API_KEY
)


def generate_lab_explanation(
    test_name: str,
    result: float | str,
    unit: str | None,
    reference_range: str | None,
    status: str,
) -> str:

    prompt = f"""
You are assisting with an educational clinical laboratory results analyzer.

Explain this laboratory result in simple, clinically relevant language.

Test name: {test_name}
Result: {result}
Unit: {unit}
Reference range: {reference_range}
Classification: {status}

Rules:
- Explain why the result received this classification.
- Keep the explanation short and clear.
- Do not diagnose any disease.
- Do not claim certainty about a medical condition.
- If abnormal, explain that the result is outside the provided reference range.
- Mention that interpretation can depend on clinical context.
- Keep the response under 80 words.
"""

    response = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "You provide concise, educational explanations "
                    "of laboratory test results. Always provide a "
                    "direct text response."
                ),
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.2,
        max_tokens=150,
    )

    explanation = response.choices[0].message.content

    if explanation:
        return explanation.strip()

    return (
        "An AI explanation could not be generated for this result. "
        "Please review the value against the provided reference range."
    )