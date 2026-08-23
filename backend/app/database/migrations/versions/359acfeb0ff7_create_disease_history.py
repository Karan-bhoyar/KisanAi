"""create disease history

Revision ID: 359acfeb0ff7
Revises: 0dd927afd076
Create Date: 2026-08-02 19:29:18.391051
"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "359acfeb0ff7"
down_revision: Union[str, Sequence[str], None] = "0dd927afd076"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """
    No schema changes.

    The required tables are already created by their
    respective earlier migration files.
    """
    pass


def downgrade() -> None:
    """
    No schema changes to reverse.
    """
    pass