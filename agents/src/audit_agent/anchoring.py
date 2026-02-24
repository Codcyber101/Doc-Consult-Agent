import hashlib
from typing import List, Optional


class MerkleTree:
    """
    A simple Merkle Tree implementation for anchoring audit logs.
    Ensures the integrity and order of agent activity history.
    """

    def __init__(self, leaves: List[str]):
        self.leaves = leaves
        self.root = self._build_tree(leaves)

    def _build_tree(self, nodes: List[str]) -> Optional[str]:
        if not nodes:
            return None
        if len(nodes) == 1:
            return nodes[0]

        new_level = []
        for i in range(0, len(nodes), 2):
            left = nodes[i]
            right = nodes[i + 1] if i + 1 < len(nodes) else nodes[i]
            combined = hashlib.sha256((left + right).encode()).hexdigest()
            new_level.append(combined)

        return self._build_tree(new_level)


class MerkleAnchor:
    """
    Periodically anchors batches of signed audit logs.
    In production, the root hash would be published to a sovereign blockchain
    or a trusted timestamping service.
    """

    def anchor_batch(self, log_signatures: List[str]) -> str:
        if not log_signatures:
            return ""

        tree = MerkleTree(log_signatures)
        root_hash = tree.root

        print(
            f"[AUDIT ANCHOR] Anchored {len(log_signatures)} logs. Root: {root_hash[:16]}..."
        )
        return root_hash


merkle_anchor = MerkleAnchor()
