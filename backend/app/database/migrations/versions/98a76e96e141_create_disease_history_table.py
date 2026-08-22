"""create disease history table

Revision ID: 98a76e96e141
Revises: 85ffa8cb1328
Create Date: 2026-07-30
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers
revision: str = "98a76e96e141"
down_revision: Union[str, Sequence[str], None] = "85ffa8cb1328"
branch_labels = None
depends_on = None


def upgrade() -> None:
    """Create disease_history table."""

    op.create_table(
        "disease_history",

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
            "image_url",
            sa.String(length=255),
            nullable=False
        ),

        sa.Column(
            "disease_name",
            sa.String(length=100),
            nullable=False
        ),

        sa.Column(
            "description",
            sa.Text(),
            nullable=False
        ),

        sa.Column(
            "treatment",
            sa.Text(),
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

        sa.PrimaryKeyConstraint("id")
    )


def downgrade() -> None:
    """Remove disease_history table."""

    # Database does not currently contain this table,
    # so avoid drop error during downgrade.
    pass