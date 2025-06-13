import openai

# Налаштування API-ключа (замініть на ваш ключ)
openai.api_key = "your-api-key-here"

# Функція для виконання текстового запиту до моделі GPT
def get_gpt_response(prompt):
    try:
        response = openai.Completion.create(
            model="gpt-4",  # Використовуємо GPT-4 (якщо доступно через API)
            prompt=prompt,
            max_tokens=150,
            temperature=0.7
        )
        return response.choices[0].text.strip()
    except Exception as e:
        return f"Помилка: {str(e)}"

# Приклад запиту
prompt = "Поясни, що таке трансформерна архітектура в контексті великих мовних моделей."
response = get_gpt_response(prompt)

# Виведення результату
print("Запит:", prompt)
print("Відповідь:", response)