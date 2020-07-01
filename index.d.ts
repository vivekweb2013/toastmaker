declare module 'toastmaker' {
    interface Options {
        styles?: object;
        classList?: string[];
        align?: 'left' | 'center' | 'right';
        valign?: 'top' | 'bottom';
    }

    function toastmaker(text: string, timeout?: number, options?: Options): void;
    export = toastmaker;
}