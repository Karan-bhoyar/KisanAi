"""create weather history table

Revision ID: c11875b18026
Revises: d61856694fa7
Create Date: 2026-07-30 09:48:03.604658

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers
revision: str = "c11875b18026"
down_revision: Union[str, Sequence[str], None] = "d61856694fa7"
branch_labels = None
depends_on = None


def upgrade() -> None:

    op.create_table(
        "weather_history",

        sa.Column(
            "id",
            sa.Integer(),
            primary_key=True,
            index=True
        ),

        sa.Column(
            "user_id",
            sa.Integer(),
            nullable=False
        ),

        sa.Column(
            "location",
            sa.String(length=100),
            nullable=False
        ),

        sa.Column(
            "temperature",
            sa.Float(),
            nullable=False
        ),

        sa.Column(
            "humidity",
            sa.Float(),
            nullable=False
        ),

        sa.Column(
            "rainfall",
            sa.Float(),
            nullable=False
        ),

        sa.Column(
            "weather_condition",
            sa.String(length=100),
            nullable=False
        ),

        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.func.now(),
            nullable=False
        ),

        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"]
        )
    )


def downgrade() -> None:

    op.drop_table(
        "weather_history"
    )