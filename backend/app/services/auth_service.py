from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)

from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user_schema import UserRegister


class AuthService:

    @staticmethod
    def register(db: Session, user_data: UserRegister):

        print("\n========== REGISTER DEBUG ==========")
        print("Email:", user_data.email)
        print("Password Received:", user_data.password)
        print(
            "Password Length:",
            len(user_data.password.encode("utf-8"))
        )
        print("====================================")

        existing = UserRepository.get_by_email(
            db,
            user_data.email
        )

        if existing:
            raise Exception("Email already exists")

        user = User(
            full_name=user_data.full_name,
            email=user_data.email,
            phone=user_data.phone,
            password_hash=hash_password(
                user_data.password
            ),
            role=user_data.role,
            language=user_data.language,
        )

        return UserRepository.create(db, user)


    @staticmethod
    def login(
        db: Session,
        email: str,
        password: str
    ):

        print("\n========== LOGIN DEBUG ==========")
        print("Entered Email:", email)

        user = UserRepository.get_by_email(
            db,
            email
        )

        if user is None:
            print("❌ User not found")
            print("================================")
            return None

        print("Database Email:", user.email)
        print("Entered Password:", password)
        print("Stored Hash:", user.password_hash)

        is_valid = verify_password(
            password,
            user.password_hash
        )

        print("Password Match:", is_valid)

        if not is_valid:
            print("❌ Invalid Password")
            print("================================")
            return None

        token = create_access_token(
            {
                "sub": user.email,
                "role": user.role.value,
            }
        )

        print("✅ Login Successful")
        print("================================")

        return token