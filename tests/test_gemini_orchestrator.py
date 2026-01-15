import os
import subprocess
import pathlib


def run_bash(cmd, cwd=None, env=None):
    r = subprocess.run(cmd, shell=True, cwd=cwd, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    return r


def test_skip_whitespace_and_create_main(tmp_path):
    # Create a temporary git repo with a main branch
    repo = tmp_path / "repo"
    repo.mkdir()
    subprocess.run(["git", "init", "-b", "main"], cwd=repo, check=True)
    (repo / "README.md").write_text("# test repo")
    # configure user to allow commits in test env
    subprocess.run(["git", "config", "user.email", "test@example.com"], cwd=repo, check=True)
    subprocess.run(["git", "config", "user.name", "Test User"], cwd=repo, check=True)
    subprocess.run(["git", "add", "."], cwd=repo, check=True)
    subprocess.run(["git", "commit", "-m", "initial commit"], cwd=repo, check=True)

    worktrees = tmp_path / "worktrees"
    env = os.environ.copy()
    env["REPO"] = str(repo)
    env["WORKTREES_DIR"] = str(worktrees)

    # Source the script (defining functions) then override BRANCHES with a whitespace-only entry and call create_worktrees
    cmd = '. "$(pwd)/gemini_orchestrator.sh"; BRANCHES=(" " "main"); create_worktrees'
    r = subprocess.run(["bash", "-lc", cmd], cwd=os.getcwd(), env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    out = r.stdout
    assert "skipping empty branch entry" in out

    # Verify that a worktree for 'main' was created
    wt_main = worktrees / "main"
    assert wt_main.exists()
