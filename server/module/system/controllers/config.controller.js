

exports.publicConfig = async (req, res, next) => {

    try {
        const items = await DB.Config.find({ public: true }).exec();
        const data = {};
        // data setup key value 
        items.forEach(item =>{
            data[item.key] = item.value;
        });

        const languages = await DB.I18nLanguage.find({ isActive: true });
        // find default language
        const defaultLanguage = languages.filter(lang => lang.isDefault).map(lang => lang.key);
        // language object filter & default language set
        data.i18n = {
            languages: languages.map(lang => ({
                key: lang.key,
                name: lang.name,
            })),
            defaultLanguage: defaultLanguage && defaultLanguage.length ? defaultLanguage[0] : 'en'
        }
        res.locals.publicConfig = data;
        next()
    } catch (e) {
        next();
    }
}
