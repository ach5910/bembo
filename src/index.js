const defaultCtx = {
    name: "",
    mods: {}
}

function isString(v){
    return typeof v == "string";
}

function isMod(v){
    return typeof v == "object" && v !== null;
}

function debug(){
    return {
        name: this.name,
        mods: {...this.mods}
    }
}

function mergeCtx(ctx){
    ctx.name = `${this.name && ctx.name ? `${this.name}__` : this.name}${ctx.name}`;
    ctx.mods = {
        ...this.mods,
        ...ctx.mods
    }
    return ctx;
}

function toString(){
    const classNames = [this.name];
    Object.entries(this.mods)
        .filter(([, value]) => !!value)
        .forEach(([mod]) => {
            classNames.push(`${this.name}--${mod}`)
        })
    
    return classNames.join(" ");
}

function createMods(...params){
    const ctx = {...defaultCtx};
    ctx.mods = params
        .reduce((acc, curr) => {
            if (isMod(curr)){
                return {...acc, ...curr}
            }
            acc[curr] = curr;
            return acc;
        }, {})
    ctx.mergeCtx = mergeCtx.bind(ctx);
    ctx.toString = toString.bind(ctx);
    return ctx;
}

function createCtx(...params){
    const ctx = {...defaultCtx};
    ctx.name = params
        .filter(isString)
        .reduce((acc, curr) => `${acc ? `${acc}-` : acc}${curr.trim()}`, "");

    ctx.mods = params
        .filter(isMod)
        .reduce((acc, curr) => ({...acc, ...curr}), {});

    ctx.mergeCtx = mergeCtx.bind(ctx);
    ctx.toString = toString.bind(ctx);
    return ctx;

}

function createBem(ctx){
    const _bem = bem.bind(ctx);
    _bem.toString = toString.bind(ctx);
    _bem.debug = debug.bind(ctx);
    return {
        el: bem.bind(ctx),
        e: bem.bind(ctx),
        mod: mod.bind(ctx),
        m: mod.bind(ctx),
        toString: toString.bind(ctx),
        debug: debug.bind(ctx)
    };
}

function mod(...params){
    if (params.length == 0){
        return this.toString()
    }

    const ctx = this.mergeCtx(createMods(...params))
    return createBem(ctx);
}


function bem(...params){
    if (params.length == 0){
        return this.toString()
    }

    const ctx = this.mergeCtx(createCtx(...params))
    return createBem(ctx);

}
function factory(...params){
    const _default = createCtx();
    return bem.call(_default, ...params)
}

export default factory;
