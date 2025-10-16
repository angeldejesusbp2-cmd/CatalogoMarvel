module.exports = function(api) {
    api.cache(true);

    return {
        presets: [["babel-preset-expo", {
            jsxImportSource: "nativewind"
        }], "nativewind/babel"],

        plugins: [
            "react-native-reanimated/plugin",
            ["module-resolver", {
                root: ["./"],
                alias: {
                    "@": "./",
                    "tailwind.config": "./tailwind.config.js"
                }
            }],
            ["module:react-native-dotenv", {
                moduleName: "@env",
                path: ".env",
                blacklist: null,
                whitelist: ["MARVEL_PUBLIC_KEY", "MARVEL_PRIVATE_KEY"],
                safe: false,
                allowUndefined: true
            }]
        ]
    };
};
