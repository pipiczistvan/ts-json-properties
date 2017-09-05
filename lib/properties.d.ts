export declare class Properties {
    private static _instance;
    private _properties;
    /**
     *
     * @param file
     */
    constructor(file: string);
    /**
     *
     * @param node
     * @param file
     */
    private read(node, file);
    /**
     * Set a new key. If key exists then ignored.
     * @param key
     * @param value
     */
    set(key: string, value: any): this;
    /**
     *
     * @param node
     * @param cwd
     * @param propertiesFilesList
     */
    private mount(node, cwd, propertiesFilesList);
    /**
     *
     * @param expression
     * @returns {any}
     */
    get(expression: any): any;
    static getValue(expression: any): any;
    /**
     * Load file properties from file location or autoload file (set just filename)
     * @param file
     * @param autoload
     * @returns {Properties}
     */
    static initialize(file?: string, autoload?: boolean): Properties;
    static clean(): void;
    /**
     * Find properties.json in the folder, parent folder, etc...
     * @returns {any}
     */
    static findPropertiesFile(file?: string): boolean | string;
}
