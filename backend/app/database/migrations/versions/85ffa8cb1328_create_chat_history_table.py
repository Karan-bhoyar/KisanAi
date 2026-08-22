"""create chat_history table

Revision ID: 85ffa8cb1328
Revises: 08bdf4bbae46
Create Date: 2026-07-30 07:41:36.282774

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "85ffa8cb1328"
down_revision: Union[str, Sequence[str], None] = "08bdf4bbae46"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create chat_history table."""

    op.create_table(
        "chat_history",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("response", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        op.f("ix_chat_history_id"),
        "chat_history",
        ["id"],
        unique=False,
    )


def downgrade() -> None:
    """Drop chat_history table."""

    op.drop_index(
        op.f("ix_chat_history_id"),
        table_name="chat_history",
    )

    op.drop_table("chat_history")