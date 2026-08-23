"""create kisan ai tables

Revision ID: 0dd927afd076
Revises: 2325422fd4fe
Create Date: 2026-07-31 12:29:53.080435
"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "0dd927afd076"

down_revision: Union[str, Sequence[str], None] = "2325422fd4fe"

branch_labels: Union[str, Sequence[str], None] = None

depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """
    No schema changes.

    All Kisan AI tables are already created
    by the previous migration files.
    """
    pass


def downgrade() -> None:
    """
    No schema changes to reverse.
    """
    pass
