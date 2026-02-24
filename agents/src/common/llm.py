from typing import Any, List, Optional
from langchain_groq import ChatGroq
from langchain_core.language_models.chat_models import BaseChatModel
from langchain_core.messages import BaseMessage, AIMessage
from langchain_core.outputs import ChatResult, ChatGeneration
from common.config import settings
from cost_control_agent.enforcer import budget_enforcer
from cost_control_agent.monitor import cost_monitor


class GovernedChatGroq(ChatGroq):
    """
    A wrapper around ChatGroq that enforces budget limits and tracks costs.
    """

    session_id: Optional[str] = None

    def _generate(
        self,
        messages: List[BaseMessage],
        stop: Optional[List[str]] = None,
        run_manager: Optional[Any] = None,
        **kwargs: Any,
    ) -> ChatResult:
        # 1. Check Budget
        allowed, reason = budget_enforcer.is_allowed(self.session_id)
        if not allowed:
            raise PermissionError(f"LLM Call Blocked by Cost Control: {reason}")

        # 2. Call Parent
        result = super()._generate(messages, stop, run_manager, **kwargs)

        # 3. Track Usage
        try:
            token_usage = result.llm_output.get("token_usage", {})
            input_tokens = token_usage.get("prompt_tokens", 0)
            output_tokens = token_usage.get("completion_tokens", 0)
            model_name = result.llm_output.get("model_name", self.model_name)

            cost_monitor.track_usage(
                model=model_name,
                input_tokens=input_tokens,
                output_tokens=output_tokens,
                session_id=self.session_id,
            )
        except Exception as e:
            print(f"[COST CONTROL] Warning: Failed to track usage: {e}")

        return result

    async def _agenerate(
        self,
        messages: List[BaseMessage],
        stop: Optional[List[str]] = None,
        run_manager: Optional[Any] = None,
        **kwargs: Any,
    ) -> ChatResult:
        # 1. Check Budget
        allowed, reason = budget_enforcer.is_allowed(self.session_id)
        if not allowed:
            raise PermissionError(f"LLM Call Blocked by Cost Control: {reason}")

        # 2. Call Parent
        result = await super()._agenerate(messages, stop, run_manager, **kwargs)

        # 3. Track Usage
        try:
            # For async, we might need to check where llm_output is
            token_usage = result.llm_output.get("token_usage", {})
            input_tokens = token_usage.get("prompt_tokens", 0)
            output_tokens = token_usage.get("completion_tokens", 0)
            model_name = result.llm_output.get("model_name", self.model_name)

            cost_monitor.track_usage(
                model=model_name,
                input_tokens=input_tokens,
                output_tokens=output_tokens,
                session_id=self.session_id,
            )
        except Exception as e:
            print(f"[COST CONTROL] Warning: Failed to track usage: {e}")

        return result


def get_llm(
    temperature: float = 0.0, model_name: str = None, session_id: str = None
) -> GovernedChatGroq:
    """
    Returns a configured GovernedChatGroq instance.
    """
    if not settings.GROQ_API_KEY:
        return DummyChatModel(model_name=model_name or "dummy", temperature=temperature)

    return GovernedChatGroq(
        model=model_name or settings.GROQ_MODEL_NAME,
        temperature=temperature,
        api_key=settings.GROQ_API_KEY,
        session_id=session_id,
    )


class DummyChatModel(BaseChatModel):
    """
    Minimal offline-safe chat model for tests when no GROQ_API_KEY is set.
    """

    model_name: str
    temperature: float = 0.0

    @property
    def _llm_type(self) -> str:
        return "dummy"

    def _generate(
        self,
        messages: List[BaseMessage],
        stop: Optional[List[str]] = None,
        run_manager: Optional[Any] = None,
        **kwargs: Any,
    ) -> ChatResult:
        content = '{"findings": []}'
        return ChatResult(
            generations=[ChatGeneration(message=AIMessage(content=content))],
            llm_output={"token_usage": {}, "model_name": self.model_name},
        )

    async def _agenerate(
        self,
        messages: List[BaseMessage],
        stop: Optional[List[str]] = None,
        run_manager: Optional[Any] = None,
        **kwargs: Any,
    ) -> ChatResult:
        return self._generate(messages, stop, run_manager, **kwargs)
