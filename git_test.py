def add(x, y):
    """두 숫자의 합을 계산합니다."""
    return x + y

def subtract(x, y):
    """두 숫자의 차를 계산합니다."""
    return x - y

def multiply(x, y):
    """두 숫자의 곱을 계산합니다."""
    return x * y

def divide(x, y):
    """두 숫자의 나눗셈을 계산합니다. (0으로 나누는 경우는 처리하지 않습니다.)"""
    if y == 0:
        return "Error: Division by zero!"
    return x / y

# 사용자로부터 숫자를 입력받습니다.
num1 = float(input("첫 번째 숫자를 입력하세요: "))
num2 = float(input("두 번째 숫자를 입력하세요: "))

# 각각의 연산을 수행하고 결과를 출력합니다.
print("더하기 결과:", add(num1, num2))
print("빼기 결과:", subtract(num1, num2))
print("곱하기 결과:", multiply(num1, num2))
print("나누기 결과:", divide(num1, num2))