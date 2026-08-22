"""create kisan ai tables

Revision ID: 0dd927afd076
Revises: 2325422fd4fe
Create Date: 2026-07-31 12:29:53.080435

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "0dd927afd076"
down_revision: Union[str, Sequence[str], None] = "2325422fd4fe"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    op.create_table(
        "farmer_profiles",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=True),
        sa.Column("phone", sa.String(), nullable=True),
        sa.Column("location", sa.String(), nullable=True),
    )


    op.create_table(
        "chat_history",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), nullable=True),
        sa.Column("question", sa.Text(), nullable=False),
        sa.Column("answer", sa.Text(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.func.now()
        ),
    )


    op.create_table(
        "documents",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("filename", sa.String(), nullable=False),
        sa.Column("content", sa.Text(), nullable=True),
    )


    op.create_table(
        "government_schemes",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
    )


    op.create_table(
        "market_prices",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("crop_name", sa.String(), nullable=False),
        sa.Column("price", sa.Float(), nullable=False),
    )


    op.create_table(
        "weather_history",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("location", sa.String(), nullable=False),
        sa.Column("temperature", sa.Float(), nullable=True),
    )


    op.create_table(
        "crop_recommendations",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("crop_name", sa.String(), nullable=False),
        sa.Column("recommendation", sa.Text(), nullable=True),
    )


    op.create_table(
        "disease_history",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("image", sa.String(), nullable=True),
        sa.Column("disease", sa.String(), nullable=True),
        sa.Column("treatment", sa.Text(), nullable=True),
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_table("disease_history")
    op.drop_table("crop_recommendations")
    op.drop_table("weather_history")
    op.drop_table("market_prices")
    op.drop_table("government_schemes")
    op.drop_table("documents")
    op.drop_table("chat_history")
    op.drop_table("farmer_profiles")