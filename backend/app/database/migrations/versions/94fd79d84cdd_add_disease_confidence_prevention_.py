"""add disease confidence prevention category

Revision ID: 94fd79d84cdd
Revises: 359acfeb0ff7
Create Date: 2026-08-04 10:03:41.038803

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '94fd79d84cdd'
down_revision: Union[str, Sequence[str], None] = '359acfeb0ff7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None



def upgrade() -> None:
    """Upgrade schema."""

    # Add new columns with default values for existing records

    op.add_column(
        'disease_history',
        sa.Column(
            'category',
            sa.String(length=50),
            nullable=False,
            server_default='Unknown'
        )
    )


    op.add_column(
        'disease_history',
        sa.Column(
            'confidence',
            sa.String(length=20),
            nullable=False,
            server_default='0%'
        )
    )


    op.add_column(
        'disease_history',
        sa.Column(
            'prevention',
            sa.Text(),
            nullable=False,
            server_default='No prevention available.'
        )
    )



def downgrade() -> None:
    """Downgrade schema."""

    op.drop_column(
        'disease_history',
        'prevention'
    )

    op.drop_column(
        'disease_history',
        'confidence'
    )

    op.drop_column(
        'disease_history',
        'category'
    )