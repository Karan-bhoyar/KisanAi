"""create chats table

Revision ID: 041e6193457e
Revises: 94fd79d84cdd
Create Date: 2026-08-24 08:58:49.759554

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "041e6193457e"
down_revision: Union[str, Sequence[str], None] = "94fd79d84cdd"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create chats table."""

    op.create_table(
        "chats",

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
            "message",
            sa.Text(),
            nullable=False
        ),

        sa.Column(
            "response",
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
            ["users.id"],
        ),

        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        op.f("ix_chats_id"),
        "chats",
        ["id"],
        unique=False,
    )


def downgrade() -> None:
    """Drop chats table."""

    op.drop_index(
        op.f("ix_chats_id"),
        table_name="chats",
    )

    op.drop_table("chats")