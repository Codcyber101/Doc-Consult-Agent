from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor, ConsoleSpanExporter

# Initialize tracing
provider = TracerProvider()
processor = BatchSpanProcessor(ConsoleSpanExporter())
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

tracer = trace.get_tracer("gae-agent-ensemble")

def trace_agent(agent_name: str):
    """Decorator to trace agent node execution."""
    def decorator(func):
        async def wrapper(*args, **kwargs):
            with tracer.start_as_current_span(f"agent.{agent_name}") as span:
                span.set_attribute("agent.name", agent_name)
                return await func(*args, **kwargs)
        return wrapper
    return decorator
