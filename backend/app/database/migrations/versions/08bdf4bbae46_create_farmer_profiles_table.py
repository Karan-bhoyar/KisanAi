"""create farmer_profiles table

Revision ID: 08bdf4bbae46
Revises: d3c0304c7f2e
Create Date: 2026-07-29 12:13:53.591729

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "08bdf4bbae46"
down_revision: Union[str, Sequence[str], None] = "d3c0304c7f2e"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create farmer_profiles table."""

    op.create_table(
        "farmer_profiles",

        sa.Column(
            "id",
            sa.Integer(),
            nullable=False
        ),

        sa.Column(
            "user_id",
            sa.Integer(),
            nullable=False
        ),

        sa.Column(
            "village",
            sa.String(length=100),
            nullable=False
        ),

        sa.Column(
            "district",
            sa.String(length=100),
            nullable=False
        ),

        sa.Column(
            "state",
            sa.String(length=100),
            nullable=False
        ),

        sa.Column(
            "land_area",
            sa.String(length=50),
            nullable=False
        ),

        sa.Column(
            "soil_type",
            sa.String(length=50),
            nullable=False
        ),

        sa.Column(
            "main_crop",
            sa.String(length=100),
            nullable=False
        ),

        sa.Column(
            "irrigation_type",
            sa.String(length=100),
            nullable=False
        ),

        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=False
        ),

        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"]
        ),

        sa.PrimaryKeyConstraint(
            "id"
        ),

        sa.UniqueConstraint(
            "user_id"
        )
    )


def downgrade() -> None:
    """Remove farmer_profiles table."""

    op.drop_table("farmer_profiles")