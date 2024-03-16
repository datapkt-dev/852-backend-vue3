import { createI18n } from "vue-i18n";

const langs = import.meta.glob("@/assets/local/*.json");

// 等待所有语言文件加载完成的异步函数
async function loadLanguages() {
    const loadedLanguages = {};

    const importPromises = Object.keys(langs).map(async (path) => {
        //  從 path = '/src/assets/local/en-us.json' 取代 '/src/assets/local/' 與 '.json'
        const langCode = path.replace('/src/assets/local/', '').replace('.json', '');
        const langModule = await langs[path]();
        loadedLanguages[langCode] = langModule.default;
    });

    await Promise.all(importPromises);

    return loadedLanguages;
}

// 导出 I18n 对象
let i18nInstance = null;

async function setupI18n() {
    const loadedLanguages = await loadLanguages();

    i18nInstance = createI18n({
        legacy: false,
        locale: "hk",
        fallbackLocale: "hk",
        messages: loadedLanguages,
    });

    return i18nInstance;
}

// 在适当的时机调用 setupI18n 函数
await setupI18n();



export { i18nInstance  };