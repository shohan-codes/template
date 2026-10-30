import { defineConfig } from "tsdown"

export default defineConfig({
  entry: ["src/index.ts", "src/**/*.tsx", "src/**/*.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  unbundle: true,
  platform: "neutral",
  inputOptions: {
    onwarn(warning, defaultHandler) {
      if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
        return
      }
      defaultHandler(warning)
    },
  },
})

