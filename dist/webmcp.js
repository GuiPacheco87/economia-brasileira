(() => {
  const context = document.modelContext;
  if (!context?.registerTool) return;

  const valid = ["base", "focus", "up", "down"];
  try {
    void Promise.resolve(context.registerTool({
      name: "select_economic_scenario",
      title: "Selecionar cenário econômico",
      description: "Seleciona um dos quatro cenários do painel e atualiza os gráficos, indicadores e a tabela visíveis.",
      inputSchema: {
        type: "object",
        properties: {
          scenario: { type: "string", enum: valid }
        },
        required: ["scenario"],
        additionalProperties: false
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!input || !valid.includes(input.scenario)) throw new Error("Cenário inválido.");
        set(input.scenario);
        return { selectedScenario: input.scenario, title: S[input.scenario].name };
      }
    })).catch(() => {});
  } catch (_) {}
})();
