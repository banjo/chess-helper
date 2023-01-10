import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        monkey({
            entry: "src/index.ts",
            userscript: {
                icon: "https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/SamCopeland/phpmeXx6V.png",
                namespace: "chess-helper",
                match: ["https://www.chess.com/*"],
                "run-at": "document-end",
            },
        }),
    ],
});
