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
    def register(
        db: Session,
        user_data: UserRegister
    ):

        print("\n========== REGISTER DEBUG ==========")
        print("Email:", user_data.email)
        print("====================================")

        # Check whether email already exists
        existing = UserRepository.get_by_email(
            db,
            user_data.email.strip()
        )

        if existing:
            raise Exception("Email already exists")

        # Create user
        user = User(
            full_name=user_data.full_name,
            email=user_data.email.strip(),
            phone=user_data.phone.strip(),
            password_hash=hash_password(
                user_data.password
            ),
            role=user_data.role,
            language=user_data.language,
        )

        created_user = UserRepository.create(
            db,
            user
        )

        print("✅ Registration Successful")
        print("User ID:", created_user.id)
        print("====================================")

        return created_user


    @staticmethod
    def login(
        db: Session,
        email: str,
        password: str
    ):

        print("\n========== LOGIN DEBUG ==========")
        print("Entered Email:", email)

        # Find user by email
        user = UserRepository.get_by_email(
            db,
            email.strip()
        )

        # User not found
        if user is None:
            print("❌ User not found")
            print("================================")
            return None

        print("Database Email:", user.email)
        print("User ID:", user.id)
        print("User Active:", user.is_active)

        # Check account status
        if not user.is_active:
            print("❌ User account is inactive")
            print("================================")
            return None

        # Verify password
        try:
            is_valid = verify_password(
                password,
                user.password_hash
            )
        except Exception as e:
            print("❌ Password verification error:", e)
            print("================================")
            return None

        print("Password Match:", is_valid)

        # Invalid password
        if not is_valid:
            print("❌ Invalid Password")
            print("================================")
            return None

        # Create JWT token
        token_data = {
            "sub": user.email,
            "role": user.role.value,
        }

        token = create_access_token(
            token_data
        )

        print("✅ Login Successful")
        print("================================")

        return token