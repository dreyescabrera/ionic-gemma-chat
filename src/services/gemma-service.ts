import gemmaUrl from "../assets/models/gemma-2b-it-gpu-int4.bin?url";
import { FilesetResolver, LlmInference } from "@mediapipe/tasks-genai";

export class GemmaService {
  llmInference: LlmInference | null = null;
  isLoading: boolean = false;

  constructor() {}

  async loadModel() {
    this.isLoading = true;

    try {
      const genai = await FilesetResolver.forGenAiTasks(
        // path/to/wasm/root
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@latest/wasm"
      );

      this.llmInference = await LlmInference.createFromOptions(genai, {
        baseOptions: {
          modelAssetPath: gemmaUrl,
        },
        maxTokens: 1000,
        topK: 40,
        temperature: 0.8,
        randomSeed: 101,
      });
    } catch (error) {
      console.error("Failed to load Gemma model:", error);
    }

    this.isLoading = false;
  }

  stopLoading() {
    console.log(111);

    console.log(this.llmInference);

    if (!this.llmInference) {
      throw new Error("LLM inference not initialized");
    }

    this.llmInference.close();
  }

  async generateResponse(prompt: string) {
    if (!this.llmInference) {
      throw new Error("LLM inference not initialized");
    }

    const response = await this.llmInference.generateResponse(prompt);

    return response;
  }
}
